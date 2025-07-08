<?php
// Cargar variables de entorno
require_once 'env_loader.php';

header('Content-Type: text/html; charset=UTF-8');

// Verificar que se han pasado los parámetros necesarios
if (!isset($_GET['id']) || !isset($_GET['token'])) {
    http_response_code(400);
    echo showErrorPage('Parámetros faltantes', 'La solicitud no contiene los parámetros necesarios.');
    exit();
}

$whitelistId = $_GET['id'];
$token = $_GET['token'];

try {
    // Cargar solicitudes pendientes
    $filename = 'whitelist_requests.json';
    if (!file_exists($filename)) {
        throw new Exception('No se encontraron solicitudes pendientes.');
    }
    
    $requests = json_decode(file_get_contents($filename), true);
    
    if (!isset($requests[$whitelistId])) {
        throw new Exception('Solicitud no encontrada.');
    }
    
    $request = $requests[$whitelistId];
    
    // Verificar token de seguridad
    if ($request['token'] !== $token) {
        throw new Exception('Token de seguridad inválido.');
    }
    
    // Verificar que la solicitud esté pendiente
    if ($request['status'] !== 'pending') {
        throw new Exception('Esta solicitud ya ha sido procesada.');
    }
    
    // Actualizar estado de la solicitud
    $requests[$whitelistId]['status'] = 'approved';
    $requests[$whitelistId]['approved_by'] = 'Staff';
    $requests[$whitelistId]['approved_at'] = date('Y-m-d H:i:s');
    
    // Guardar cambios
    file_put_contents($filename, json_encode($requests, JSON_PRETTY_PRINT));
    
    // Enviar notificación a Discord
    $discordMessage = "《✅》- <@" . $request['data']['discord'] . "> - 🌚 ¡Tu whitelist fue **𝐀𝐂𝐄𝐏𝐓𝐀𝐃𝐀** ! 🌚";
    $discordId = $request['data']['discord'];
    
    sendDiscordNotification($discordMessage);
    
    // Intentar asignar rol de Whitelist
    try {
        assignDiscordRole($discordId);
    } catch (Exception $e) {
        error_log("Error al asignar rol de Whitelist: " . $e->getMessage());
    }
    
    // Opcionalmente, enviar email al usuario
    sendUserNotification($request['data'], 'approved');
    
    // Mostrar página de éxito
    echo showSuccessPage($request['data']['nombrePersonaje'], 'aprobada');
    
} catch (Exception $e) {
    http_response_code(500);
    echo showErrorPage('Error al procesar', $e->getMessage());
}

function sendDiscordNotification($message) {
    // URL del webhook de Discord (cambiar por tu webhook real)
    $webhookUrl = "https://discord.com/api/webhooks/1392154027516756009/IQzI5nowrdec1NEcgYVhjWgvQRUdI-3FnjAhcqn-og6nXoECJnq9Os-kHFyj8SkNyB0j";
    
    $data = json_encode([
        "content" => $message,
        "username" => "OldStreet Whitelist Bot",
        "avatar_url" => "https://i.imgur.com/your-bot-avatar.png"
    ]);
    
    $options = [
        'http' => [
            'header' => "Content-type: application/json\r\n",
            'method' => 'POST',
            'content' => $data,
        ]
    ];
    
    $context = stream_context_create($options);
    
    // Intentar enviar (no fallar si Discord no está disponible)
    try {
        file_get_contents($webhookUrl, false, $context);
    } catch (Exception $e) {
        // Log del error pero continuar
        error_log("Error enviando a Discord: " . $e->getMessage());
    }
    
    // Intentar asignar el rol al usuario (esto se ejecutará solo si se aprueba la whitelist)
    try {
        assignDiscordRole($message);
    } catch (Exception $e) {
        error_log("Error asignando rol en Discord: " . $e->getMessage());
    }
}

// Función para asignar rol de Whitelist en Discord
function assignDiscordRole($discordId) {
    // El ID de Discord ya viene directamente como parámetro
    $userId = trim($discordId);
    $guildId = '1119729040408973333'; // ID del servidor de Discord
    $roleId = '1262793580481875998'; // ID del rol de Whitelist
    
    // Para usar esta función necesitas un bot de Discord con permisos para asignar roles
    // y su token de autenticación
    $botToken = getenv('DISCORD_BOT_TOKEN'); // Asegúrate de configurar esta variable de entorno
    
    // Si no hay token configurado, registrar un error y salir
    if (empty($botToken)) {
        error_log("No se encontró el token del bot de Discord. Configura la variable de entorno DISCORD_BOT_TOKEN.");
        return;
    }
    
    // URL de la API de Discord para asignar roles
    $url = "https://discord.com/api/v10/guilds/{$guildId}/members/{$userId}/roles/{$roleId}";
    
    $options = [
        'http' => [
            'header' => [
                "Authorization: Bot {$botToken}",
                "Content-Type: application/json",
            ],
            'method' => 'PUT',
            'ignore_errors' => true
        ]
    ];
    
    $context = stream_context_create($options);
    
    // Intentar asignar el rol
    $result = @file_get_contents($url, false, $context);
    
    // Verificar respuesta
    if ($http_response_header[0] == "HTTP/1.1 204 No Content") {
        error_log("Rol asignado correctamente al usuario {$userId}");
    } else {
        error_log("Error al asignar rol: " . $http_response_header[0]);
        if ($result) {
            error_log("Respuesta: " . $result);
        }
    }
}

function sendUserNotification($userData, $status) {
    // Aquí puedes implementar el envío de email al usuario
    // Por simplicidad, solo loguearemos por ahora
    error_log("Usuario {$userData['discord']} - Whitelist {$status}");
    
    // Ejemplo de implementación de email al usuario:
    /*
    $to = $userData['email']; // Si tienes el email del usuario
    $subject = $status === 'approved' ? 
        '🎉 ¡Tu whitelist ha sido aprobada! - OldStreet' : 
        '❌ Whitelist no aprobada - OldStreet';
    
    $message = $status === 'approved' ?
        "¡Felicidades! Tu solicitud de whitelist ha sido aprobada. Ya puedes unirte al servidor." :
        "Lo sentimos, tu solicitud de whitelist no ha sido aprobada esta vez. Puedes volver a intentarlo.";
    
    mail($to, $subject, $message);
    */
}

function showSuccessPage($nombrePersonaje, $accion) {
    return '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Whitelist ' . ucfirst($accion) . ' - OldStreet</title>
        <style>
            body {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 450px;
                margin: 0 auto;
                background: #2a2a2a;
                padding: 30px;
                border-radius: 10px;
                border: 2px solid #10b981;
                box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
                text-align: center;
            }
            .icon {
                font-size: 60px;
                margin-bottom: 15px;
            }
            h1 {
                color: #10b981;
                font-size: 28px;
                margin-bottom: 15px;
            }
            .user-info {
                background: #1a1a1a;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 3px solid #10b981;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background: #10b981;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 5px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }
            .btn:hover {
                background: #059669;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">✅</div>
            <h1>¡Whitelist ' . ucfirst($accion) . '!</h1>
            
            <div class="user-info">
                <p><strong>Personaje:</strong> ' . htmlspecialchars($nombrePersonaje) . '</p>
                <p><strong>Estado:</strong> <span style="color: #10b981; font-weight: bold;">APROBADO</span></p>
            </div>
            
            <p>Se ha enviado una notificación al usuario y se ha actualizado su rol en Discord.</p>
            
            <button onclick="window.close()" class="btn">Cerrar</button>
        </div>
        
        <script>
            setTimeout(function() {
                window.close();
            }, 10000);  // Cerrar automáticamente después de 10 segundos
        </script>
    </body>
    </html>';
}

function showErrorPage($title, $message) {
    return '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - OldStreet</title>
        <style>
            body {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                max-width: 400px;
                margin: 0 auto;
                background: #2a2a2a;
                padding: 25px;
                border-radius: 10px;
                border: 2px solid #ef4444;
                box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
                text-align: center;
            }
            .icon {
                font-size: 50px;
                margin-bottom: 15px;
            }
            h1 {
                color: #ef4444;
                font-size: 24px;
                margin-bottom: 15px;
            }
            .btn {
                display: inline-block;
                padding: 8px 20px;
                background: #ef4444;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
                border: none;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">❌</div>
            <h1>' . htmlspecialchars($title) . '</h1>
            <p>' . htmlspecialchars($message) . '</p>
            <button onclick="window.close()" class="btn">Cerrar</button>
        </div>
    </body>
    </html>';
}
?>
