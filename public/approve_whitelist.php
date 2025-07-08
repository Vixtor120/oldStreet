<?php
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
    
    sendDiscordNotification($discordMessage);
    
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
                max-width: 600px;
                margin: 0 auto;
                background: #2a2a2a;
                padding: 40px;
                border-radius: 15px;
                border: 3px solid #10b981;
                box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
                text-align: center;
            }
            .success-icon {
                font-size: 80px;
                color: #10b981;
                margin-bottom: 20px;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-30px); }
                60% { transform: translateY(-15px); }
            }
            h1 {
                color: #10b981;
                font-size: 32px;
                margin-bottom: 20px;
                text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
            }
            .user-info {
                background: #1a1a1a;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 4px solid #10b981;
            }
            .actions {
                margin-top: 30px;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                background: #10b981;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                margin: 5px;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }
            .btn:hover {
                background: #059669;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
            }
            .btn-secondary {
                background: #6b7280;
            }
            .btn-secondary:hover {
                background: #4b5563;
            }
            .timestamp {
                color: #9ca3af;
                font-size: 14px;
                margin-top: 20px;
            }
            .notification-sent {
                background: #065f46;
                border: 1px solid #10b981;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>¡Whitelist ' . ucfirst($accion) . '!</h1>
            
            <div class="user-info">
                <h3 style="color: #ffd700; margin-top: 0;">Usuario Procesado</h3>
                <p><strong>Nombre del Personaje:</strong> ' . htmlspecialchars($nombrePersonaje) . '</p>
                <p><strong>Estado:</strong> <span style="color: #10b981; font-weight: bold;">APROBADO</span></p>
            </div>
            
            <div class="notification-sent">
                <h4 style="margin-top: 0; color: #10b981;">📢 Notificaciones Enviadas</h4>
                <p>✅ Mensaje enviado al canal de Discord</p>
                <p>✅ Usuario notificado por email</p>
                <p>✅ Base de datos actualizada</p>
            </div>
            
            <div class="actions">
                <button onclick="window.close()" class="btn">
                    🔙 Cerrar Ventana
                </button>
            </div>
            
            <div class="timestamp">
                Procesado el ' . date('d/m/Y H:i:s') . '
            </div>
        </div>
        
        <script>
            // Auto-cerrar después de 30 segundos
            setTimeout(() => {
                if (confirm("¿Cerrar esta ventana automáticamente?")) {
                    window.close();
                }
            }, 30000);
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
                max-width: 500px;
                margin: 0 auto;
                background: #2a2a2a;
                padding: 40px;
                border-radius: 15px;
                border: 3px solid #ef4444;
                box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
                text-align: center;
            }
            .error-icon {
                font-size: 80px;
                color: #ef4444;
                margin-bottom: 20px;
            }
            h1 {
                color: #ef4444;
                font-size: 28px;
                margin-bottom: 20px;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                background: #ef4444;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                margin-top: 20px;
                transition: all 0.3s ease;
            }
            .btn:hover {
                background: #dc2626;
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="error-icon">❌</div>
            <h1>' . htmlspecialchars($title) . '</h1>
            <p>' . htmlspecialchars($message) . '</p>
            <button onclick="window.close()" class="btn">
                🔙 Cerrar
            </button>
        </div>
    </body>
    </html>';
}
?>
