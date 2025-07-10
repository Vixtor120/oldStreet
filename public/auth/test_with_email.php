<?php
/**
 * Endpoint final con envío de email
 */

// Configurar headers y errores
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

try {
    // Paso 1: Obtener email
    $email = trim($_POST['email'] ?? '');
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email requerido']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email no válido']);
        exit;
    }
    
    // Paso 2: Cargar dependencias
    require_once '../env_loader.php';
    require_once 'auth_system.php';
    
    // Paso 3: Conectar a la base de datos
    $auth = new AuthSystem();
    
    // Paso 4: Verificar si el usuario existe
    $user = $auth->getUserByEmail($email);
    if (!$user) {
        // Por seguridad, no revelamos si el email existe
        echo json_encode([
            'success' => true, 
            'message' => 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
        ]);
        exit;
    }
    
    // Paso 5: Generar token de recuperación
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + 86400); // 24 horas
    
    // Paso 6: Guardar token en la base de datos
    $query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
    $stmt = $auth->db->prepare($query);
    
    if (!$stmt->execute([$user['id'], $token, $email, $expires_at])) {
        throw new Exception("Error al generar token de recuperación");
    }
    
    // Paso 7: Crear enlace de recuperación
    $reset_link = ($_ENV['SITE_URL'] ?? 'https://oldstreet.oldstreetcm.com') . "/reset-password?token=" . $token;
    
    // Paso 8: Intentar enviar email
    $email_sent = false;
    $email_error = '';
    
    // Verificar si PHPMailer está disponible
    if (file_exists('../vendor/autoload.php')) {
        try {
            require_once '../vendor/autoload.php';
            
            use PHPMailer\PHPMailer\PHPMailer;
            use PHPMailer\PHPMailer\SMTP;
            use PHPMailer\PHPMailer\Exception;
            
            $mail = new PHPMailer(true);
            
            // Configuración SMTP
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'] ?? 'smtp.hostinger.com';
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'] ?? '';
            $mail->Password = $_ENV['SMTP_PASSWORD'] ?? '';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $_ENV['SMTP_PORT'] ?? 587;
            $mail->CharSet = 'UTF-8';
            
            // Configurar remitente y destinatario
            $from_email = $_ENV['SMTP_FROM_EMAIL'] ?? $_ENV['SMTP_USERNAME'] ?? 'noreply@oldstreetcm.com';
            $from_name = $_ENV['SMTP_FROM_NAME'] ?? 'Old Street RP';
            
            $mail->setFrom($from_email, $from_name);
            $mail->addAddress($email, $user['username']);
            
            // Contenido del email
            $mail->isHTML(true);
            $mail->Subject = '🔐 Recuperación de Contraseña - Old Street RP';
            $mail->Body = "
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px; border: 2px solid #d4af37; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .logo { color: #d4af37; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
                        .button { display: inline-block; background-color: #d4af37; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
                        .content { line-height: 1.6; margin-bottom: 30px; }
                        .warning { background-color: #2a1810; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0; }
                        .footer { text-align: center; margin-top: 30px; color: #888888; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <div class='logo'>🏙️ OLD STREET RP</div>
                            <h2 style='color: #d4af37; margin: 0;'>Recuperación de Contraseña</h2>
                        </div>
                        
                        <div class='content'>
                            <p>Hola <strong>{$user['username']}</strong>,</p>
                            
                            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Old Street RP.</p>
                            
                            <p>Para continuar con el proceso, haz clic en el siguiente botón:</p>
                            
                            <div style='text-align: center;'>
                                <a href='{$reset_link}' class='button'>🔓 Restablecer Contraseña</a>
                            </div>
                            
                            <div class='warning'>
                                <h4 style='color: #d4af37; margin-top: 0;'>⚠️ Información Importante:</h4>
                                <ul>
                                    <li>Este enlace es válido por <strong>24 horas</strong></li>
                                    <li>Solo puede ser usado <strong>una vez</strong></li>
                                    <li>Si no solicitaste este cambio, puedes ignorar este email</li>
                                </ul>
                            </div>
                            
                            <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                            <p style='word-break: break-all; background-color: #2a2a2a; padding: 10px; border-radius: 5px; font-family: monospace;'>{$reset_link}</p>
                        </div>
                        
                        <div class='footer'>
                            <p>Este email fue enviado automáticamente. No respondas a este mensaje.</p>
                            <p>© 2025 Old Street RP - Todos los derechos reservados</p>
                        </div>
                    </div>
                </body>
                </html>
            ";
            
            // Versión de texto plano
            $mail->AltBody = "
Recuperación de Contraseña - Old Street RP

Hola {$user['username']},

Para restablecer tu contraseña, visita este enlace: {$reset_link}

IMPORTANTE:
- Este enlace es válido por 24 horas
- Solo puede ser usado una vez
- Si no solicitaste este cambio, ignora este email

© 2025 Old Street RP
            ";
            
            $mail->send();
            $email_sent = true;
            
        } catch (Exception $e) {
            $email_error = $e->getMessage();
            error_log("Error enviando email: " . $email_error);
        }
    } else {
        $email_error = 'PHPMailer no está instalado';
    }
    
    // Paso 9: Log de actividad
    $auth->logActivity($user['id'], 'password_reset_requested', 
        $email_sent ? 'Email enviado exitosamente' : 'Email falló: ' . $email_error);
    
    // Respuesta final
    if ($email_sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Se ha enviado un enlace de recuperación a tu email'
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'message' => 'Token generado, pero no se pudo enviar el email. Por favor contacta al administrador.',
            'debug' => [
                'email_error' => $email_error,
                'reset_link' => $reset_link
            ]
        ]);
    }
    
} catch (Exception $e) {
    error_log("Error en test_with_email: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
