<?php
/**
 * Versión simplificada del endpoint de recuperación de contraseña
 * para debugging paso a paso
 */

// Configurar reportes de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

// Configurar headers
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
    // Paso 1: Verificar archivos necesarios
    if (!file_exists('../env_loader.php')) {
        throw new Exception("env_loader.php no encontrado");
    }
    
    if (!file_exists('auth_system.php')) {
        throw new Exception("auth_system.php no encontrado");
    }
    
    // Paso 2: Cargar dependencias
    require_once '../env_loader.php';
    require_once 'auth_system.php';
    
    // Paso 3: Obtener datos del POST
    $input = json_decode(file_get_contents('php://input'), true);
    $email = '';
    
    if ($input && isset($input['email'])) {
        $email = trim($input['email']);
    } else {
        $email = trim($_POST['email'] ?? '');
    }
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'El email es requerido']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email no válido']);
        exit;
    }
    
    // Paso 4: Crear instancia de AuthSystem
    $auth = new AuthSystem();
    
    // Paso 5: Verificar si el usuario existe
    $user = $auth->getUserByEmail($email);
    if (!$user) {
        // Por seguridad, no revelamos si el email existe o no
        echo json_encode([
            'success' => true, 
            'message' => 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
        ]);
        exit;
    }
    
    // Paso 6: Generar token de recuperación
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + 86400); // 24 horas
    
    // Paso 7: Guardar token en la base de datos
    $query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
    $stmt = $auth->db->prepare($query);
    
    if (!$stmt->execute([$user['id'], $token, $email, $expires_at])) {
        throw new Exception("Error al generar token de recuperación");
    }
    
    // Paso 8: Intentar enviar email (opcional)
    $email_sent = false;
    $reset_link = ($_ENV['SITE_URL'] ?? 'http://localhost') . "/reset-password?token=" . $token;
    
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
                <h2>Recuperación de Contraseña</h2>
                <p>Hola {$user['username']},</p>
                <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                <p><a href='{$reset_link}' style='background-color: #d4af37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Restablecer Contraseña</a></p>
                <p>Este enlace es válido por 24 horas.</p>
                <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
            ";
            
            $mail->send();
            $email_sent = true;
            
        } catch (Exception $e) {
            error_log("Error enviando email: " . $e->getMessage());
            // No es crítico, continuamos sin email
        }
    }
    
    // Paso 9: Log de actividad
    try {
        $auth->logActivity($user['id'], 'password_reset_requested', 'Token generado');
    } catch (Exception $e) {
        error_log("Error en log de actividad: " . $e->getMessage());
    }
    
    // Paso 10: Respuesta exitosa
    $message = $email_sent ? 
        'Se ha enviado un enlace de recuperación a tu email' : 
        'Token generado. Por favor revisa la configuración de email.';
    
    echo json_encode([
        'success' => true,
        'message' => $message,
        'debug' => [
            'email_sent' => $email_sent,
            'phpmailer_available' => file_exists('../vendor/autoload.php'),
            'token_generated' => !empty($token),
            'reset_link' => $reset_link
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Error en request_password_reset_simple: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'debug' => [
            'error_file' => __FILE__,
            'error_line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]
    ]);
}
?>
