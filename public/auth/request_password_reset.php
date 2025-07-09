<?php
/**
 * Endpoint para solicitar recuperación de contraseña
 * POST /auth/request_password_reset.php
 */

require_once '../env_loader.php';
require_once 'auth_system.php';

// Configurar headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    // Obtener datos del POST
    $email = trim($_POST['email'] ?? '');
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'El email es requerido']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email no válido']);
        exit;
    }
    
    $auth = new AuthSystem();
    
    // Verificar si el email existe
    $user = $auth->getUserByEmail($email);
    if (!$user) {
        // Por seguridad, no revelamos si el email existe o no
        echo json_encode([
            'success' => true, 
            'message' => 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
        ]);
        exit;
    }
    
    // Generar token de recuperación
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + (60 * 60)); // 1 hora de expiración
    
    // Guardar token en la base de datos
    $query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
    $stmt = $auth->db->prepare($query);
    $stmt->bind_param("isss", $user['id'], $token, $email, $expires_at);
    
    if (!$stmt->execute()) {
        throw new Exception("Error al generar token de recuperación");
    }
    
    // Enviar email de recuperación
    $reset_link = $_ENV['SITE_URL'] . "/reset-password?token=" . $token;
    $sent = sendPasswordResetEmail($email, $user['username'], $reset_link);
    
    if ($sent) {
        // Log de actividad
        $auth->logActivity($user['id'], 'password_reset_requested', 'Token enviado por email');
        
        echo json_encode([
            'success' => true,
            'message' => 'Se ha enviado un enlace de recuperación a tu email'
        ]);
    } else {
        throw new Exception("Error al enviar el email de recuperación");
    }
    
} catch (Exception $e) {
    error_log("Error en request_password_reset: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor'
    ]);
}

/**
 * Función para enviar email de recuperación de contraseña
 */
function sendPasswordResetEmail($email, $username, $reset_link) {
    // Configuración de email
    $to = $email;
    $subject = "Recuperación de Contraseña - OldStreet RP";
    
    // Plantilla HTML del email
    $html_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Recuperación de Contraseña</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                background-color: #0a0a0a; 
                color: #ffffff; 
                margin: 0; 
                padding: 20px; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #1a1a1a; 
                border-radius: 10px; 
                padding: 30px; 
                border: 2px solid #d4af37; 
            }
            .header { 
                text-align: center; 
                margin-bottom: 30px; 
            }
            .logo { 
                color: #d4af37; 
                font-size: 28px; 
                font-weight: bold; 
                margin-bottom: 10px; 
            }
            .button { 
                display: inline-block; 
                background-color: #d4af37; 
                color: #000000; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 5px; 
                font-weight: bold; 
                margin: 20px 0; 
            }
            .footer { 
                text-align: center; 
                margin-top: 30px; 
                color: #888888; 
                font-size: 12px; 
            }
            .warning { 
                background-color: #2a1f1f; 
                border-left: 4px solid #ff6b6b; 
                padding: 15px; 
                margin: 20px 0; 
                border-radius: 5px; 
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <div class='logo'>🏛️ OldStreet RP</div>
                <h1>Recuperación de Contraseña</h1>
            </div>
            
            <p>Hola <strong>{$username}</strong>,</p>
            
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en OldStreet RP.</p>
            
            <p>Para continuar con el proceso de recuperación, haz clic en el siguiente enlace:</p>
            
            <div style='text-align: center;'>
                <a href='{$reset_link}' class='button'>🔐 Restablecer Contraseña</a>
            </div>
            
            <div class='warning'>
                <strong>⚠️ Importante:</strong>
                <ul>
                    <li>Este enlace es válido por <strong>1 hora</strong></li>
                    <li>Solo puede ser usado <strong>una vez</strong></li>
                    <li>Si no solicitaste este cambio, ignora este email</li>
                </ul>
            </div>
            
            <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
            <p style='word-break: break-all; background-color: #2a2a2a; padding: 10px; border-radius: 5px;'>{$reset_link}</p>
            
            <div class='footer'>
                <p>Este email fue enviado automáticamente. No respondas a este mensaje.</p>
                <p>© 2025 OldStreet RP - Todos los derechos reservados</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Versión texto plano como fallback
    $text_message = "
Hola {$username},

Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en OldStreet RP.

Para continuar, visita este enlace: {$reset_link}

IMPORTANTE:
- Este enlace es válido por 1 hora
- Solo puede ser usado una vez
- Si no solicitaste este cambio, ignora este email

© 2025 OldStreet RP
";
    
    // Intentar múltiples métodos de envío
    $sent = false;
    $error_log = "";
    
    // Método 1: Configuración SMTP con ini_set (para Hostinger)
    if (!$sent) {
        ini_set('SMTP', $_ENV['SMTP_HOST'] ?? 'smtp.hostinger.com');
        ini_set('smtp_port', $_ENV['SMTP_PORT'] ?? '587');
        ini_set('sendmail_from', $_ENV['SMTP_FROM_EMAIL'] ?? $to);
        
        $headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . ($_ENV['SMTP_FROM_NAME'] ?? 'OldStreet RP') . ' <' . ($_ENV['SMTP_FROM_EMAIL'] ?? 'noreply@oldstreetcm.com') . '>',
            'Reply-To: ' . ($_ENV['SMTP_FROM_EMAIL'] ?? 'noreply@oldstreetcm.com')
        );
        
        $sent = @mail($to, $subject, $html_message, implode("\r\n", $headers));
        if (!$sent) {
            $error = error_get_last();
            $error_log .= "Método SMTP falló: " . ($error['message'] ?? 'Error desconocido') . "; ";
        }
    }
    
    // Método 2: mail() básico con headers simples
    if (!$sent) {
        $simple_headers = "From: " . ($_ENV['SMTP_FROM_EMAIL'] ?? 'noreply@oldstreetcm.com') . "\r\n";
        $simple_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        $sent = @mail($to, $subject, $text_message, $simple_headers);
        if (!$sent) {
            $error = error_get_last();
            $error_log .= "Método básico falló: " . ($error['message'] ?? 'Error desconocido') . "; ";
        }
    }
    
    // Log para debugging
    if (!$sent) {
        error_log("Error enviando email de recuperación: " . $error_log);
    } else {
        error_log("Email de recuperación enviado exitosamente a: " . $to);
    }
    
    return $sent;
}
?>
