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
    
    // Si es un POST con el formulario de rechazo, procesarlo
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'reject') {
        // Capturar el motivo de rechazo
        $rejectReason = isset($_POST['reject_reason']) ? trim($_POST['reject_reason']) : '';
        
        // Actualizar estado de la solicitud
        $requests[$whitelistId]['status'] = 'rejected';
        $requests[$whitelistId]['approved_by'] = 'Staff';
        $requests[$whitelistId]['approved_at'] = date('Y-m-d H:i:s');
        $requests[$whitelistId]['reject_reason'] = $rejectReason;
        
        // Guardar cambios
        file_put_contents($filename, json_encode($requests, JSON_PRETTY_PRINT));
        
        // Preparar mensaje para Discord con el motivo si existe
        $discordMessage = "《🚫》- <@" . $request['data']['discord'] . "> - 🌚 ¡Tu whitelist fue **𝐑𝐄𝐂𝐇𝐀𝐙𝐀𝐃𝐀** ! 🌚";
        
        // Añadir el motivo al mensaje si fue proporcionado
        if (!empty($rejectReason)) {
            $discordMessage .= "\n📝 **Motivo:** " . $rejectReason;
        }
        
        // Enviar notificación a Discord con el motivo si existe
        sendDiscordNotification($discordMessage);
        
        // Opcionalmente, enviar email al usuario con el motivo
        sendUserNotification($request['data'], 'rejected', $rejectReason);
        
        // Mostrar página de éxito
        echo showSuccessPage($request['data']['nombrePersonaje'], 'rechazada');
    } else {
        // Mostrar formulario para indicar el motivo del rechazo
        echo showRejectForm($request, $whitelistId, $token);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo showErrorPage('Error al procesar', $e->getMessage());
}

function sendDiscordNotification($message) {
    // URL del webhook de Discord
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
}

function sendUserNotification($userData, $status, $rejectReason = '') {
    // Aquí puedes implementar el envío de email al usuario
    // Por simplicidad, solo loguearemos por ahora
    error_log("Usuario {$userData['discord']} - Whitelist {$status}" . ($rejectReason ? " - Motivo: {$rejectReason}" : ""));
    
    // Ejemplo de implementación de email al usuario:
    /*
    $to = $userData['email']; // Si tienes el email del usuario
    $subject = '❌ Whitelist no aprobada - OldStreet';
    
    $message = "Hola {$userData['nombrePersonaje']},\n\n" .
               "Lamentamos informarte que tu solicitud de whitelist no ha sido aprobada en esta ocasión.\n\n";
               
    if (!empty($rejectReason)) {
        $message .= "Motivo del rechazo:\n" . $rejectReason . "\n\n";
    }
    
    $message .= "Te recomendamos:\n" .
               "1. Revisar nuestra normativa\n" .
               "2. Mejorar tus respuestas\n" .
               "3. Volver a aplicar cuando te sientas preparado\n\n" .
               "¡No te desanimes! Muchos usuarios lo logran en el segundo intento.\n\n" .
               "Saludos,\nStaff de OldStreet";
    
    mail($to, $subject, $message);
    */
}

function showSuccessPage($nombrePersonaje, $accion) {
    // Obtener el motivo del rechazo si existe
    $rejectReason = isset($_POST['reject_reason']) ? trim($_POST['reject_reason']) : '';
    
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
                border: 2px solid #ef4444;
                box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
                text-align: center;
            }
            .icon {
                font-size: 60px;
                margin-bottom: 15px;
            }
            h1 {
                color: #ef4444;
                font-size: 28px;
                margin-bottom: 15px;
            }
            .user-info {
                background: #1a1a1a;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 3px solid #ef4444;
                text-align: left;
            }
            .reject-reason {
                background: rgba(239, 68, 68, 0.1);
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                border: 1px dashed #ef4444;
                text-align: left;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background: #ef4444;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 5px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }
            .btn:hover {
                background: #dc2626;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">❌</div>
            <h1>Whitelist ' . ucfirst($accion) . '</h1>
            
            <div class="user-info">
                <p><strong>Personaje:</strong> ' . htmlspecialchars($nombrePersonaje) . '</p>
                <p><strong>Estado:</strong> <span style="color: #ef4444; font-weight: bold;">RECHAZADO</span></p>
            </div>
            
            ' . (!empty($rejectReason) ? '
            <div class="reject-reason">
                <p><strong>Motivo del rechazo:</strong></p>
                <p>' . nl2br(htmlspecialchars($rejectReason)) . '</p>
            </div>' : '') . '
            
            <p>Se ha enviado una notificación al usuario' . (!empty($rejectReason) ? ' con el motivo del rechazo' : '') . '. Puede volver a intentarlo en el futuro.</p>
            
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

function showRejectForm($request, $whitelistId, $token) {
    $nombrePersonaje = $request['data']['nombrePersonaje'];
    $discordUsername = isset($request['data']['discordUsername']) ? $request['data']['discordUsername'] : $request['data']['discord'];
    
    return '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rechazar Whitelist - OldStreet</title>
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
                max-width: 500px;
                margin: 0 auto;
                background: #2a2a2a;
                padding: 30px;
                border-radius: 10px;
                border: 2px solid #ef4444;
                box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
                text-align: center;
            }
            .icon {
                font-size: 60px;
                margin-bottom: 15px;
            }
            h1 {
                color: #ef4444;
                font-size: 28px;
                margin-bottom: 15px;
            }
            .user-info {
                background: #1a1a1a;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 3px solid #ef4444;
                text-align: left;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background: #ef4444;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 5px;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }
            .btn-secondary {
                background: #6c757d;
            }
            .btn:hover {
                background: #dc2626;
            }
            .btn-secondary:hover {
                background: #5a6268;
            }
            textarea {
                width: 100%;
                height: 150px;
                padding: 10px;
                margin: 15px 0;
                border: 2px solid #444;
                border-radius: 5px;
                background: #1a1a1a;
                color: #fff;
                font-family: inherit;
                resize: vertical;
            }
            textarea:focus {
                border-color: #ef4444;
                outline: none;
            }
            .alert {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid #ef4444;
                padding: 10px;
                border-radius: 5px;
                margin: 15px 0;
                text-align: left;
            }
            form {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="icon">❌</div>
            <h1>Rechazar Whitelist</h1>
            
            <div class="user-info">
                <p><strong>Personaje:</strong> ' . htmlspecialchars($nombrePersonaje) . '</p>
                <p><strong>Discord:</strong> ' . htmlspecialchars($discordUsername) . ' (' . htmlspecialchars($request['data']['discord']) . ')</p>
                <p><strong>Estado actual:</strong> <span style="color: #ffc107; font-weight: bold;">PENDIENTE</span></p>
            </div>
            
            <div class="alert">
                <p><strong>Importante:</strong> El motivo del rechazo será enviado al usuario a través de Discord. Por favor, sé específico y constructivo en tu feedback.</p>
            </div>
            
            <form method="POST" action="reject_whitelist.php?id=' . $whitelistId . '&token=' . $token . '">
                <input type="hidden" name="action" value="reject">
                <textarea name="reject_reason" placeholder="Escribe aquí el motivo del rechazo (opcional, pero recomendado para ayudar al usuario a mejorar su solicitud)"></textarea>
                
                <div>
                    <button type="submit" class="btn">Rechazar Whitelist</button>
                    <button type="button" onclick="window.close()" class="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    </body>
    </html>';
}
?>
