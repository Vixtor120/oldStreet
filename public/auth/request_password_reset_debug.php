<?php
/**
 * Versión simplificada para debug del endpoint de recuperación de contraseña
 * POST /auth/request_password_reset_debug.php
 */

// Activar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Headers CORS
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
    echo json_encode(['success' => false, 'message' => 'Método no permitido', 'debug' => 'Not POST']);
    exit;
}

try {
    // Debug info
    $debug_info = [
        'method' => $_SERVER['REQUEST_METHOD'],
        'post_data' => $_POST,
        'files_exist' => [
            'env_loader' => file_exists('../env_loader.php'),
            'auth_system' => file_exists('auth_system.php')
        ]
    ];
    
    // Verificar datos básicos
    $email = trim($_POST['email'] ?? '');
    
    if (empty($email)) {
        echo json_encode([
            'success' => false, 
            'message' => 'El email es requerido',
            'debug' => $debug_info
        ]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Email no válido',
            'debug' => $debug_info
        ]);
        exit;
    }
    
    // Intentar cargar archivos
    if (!file_exists('../env_loader.php')) {
        throw new Exception("Archivo env_loader.php no encontrado");
    }
    
    require_once '../env_loader.php';
    
    if (!file_exists('auth_system.php')) {
        throw new Exception("Archivo auth_system.php no encontrado");
    }
    
    require_once 'auth_system.php';
    
    // Verificar variables de entorno
    $env_check = [
        'DB_HOST' => $_ENV['DB_HOST'] ?? 'NO_SET',
        'DB_NAME' => $_ENV['DB_NAME'] ?? 'NO_SET',
        'DB_USER' => $_ENV['DB_USER'] ?? 'NO_SET',
        'SMTP_HOST' => $_ENV['SMTP_HOST'] ?? 'NO_SET',
    ];
    
    // Intentar crear instancia de AuthSystem
    $auth = new AuthSystem();
    
    // Verificar si el email existe (simplificado)
    $query = "SELECT id, username FROM users WHERE email = ? AND is_active = TRUE LIMIT 1";
    $stmt = $auth->db->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    if (!$user) {
        // Por seguridad, no revelamos si el email existe o no
        echo json_encode([
            'success' => true, 
            'message' => 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación',
            'debug' => array_merge($debug_info, ['env_check' => $env_check, 'user_found' => false])
        ]);
        exit;
    }
    
    // Generar token simple
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + (60 * 60)); // 1 hora
    
    // Guardar token en BD
    $insert_query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
    $insert_stmt = $auth->db->prepare($insert_query);
    $insert_stmt->bind_param("isss", $user['id'], $token, $email, $expires_at);
    
    if (!$insert_stmt->execute()) {
        throw new Exception("Error al insertar token: " . $insert_stmt->error);
    }
    
    // Crear enlace de recuperación
    $reset_link = ($_ENV['SITE_URL'] ?? 'https://oldstreet.oldstreetcm.com') . "/reset-password?token=" . $token;
    
    // POR AHORA: No enviar email, solo devolver info de debug
    echo json_encode([
        'success' => true,
        'message' => 'Token generado correctamente (email deshabilitado para debug)',
        'debug' => array_merge($debug_info, [
            'env_check' => $env_check,
            'user_found' => true,
            'user_id' => $user['id'],
            'username' => $user['username'],
            'token' => $token,
            'reset_link' => $reset_link,
            'expires_at' => $expires_at
        ])
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error interno: ' . $e->getMessage(),
        'debug' => [
            'error_line' => $e->getLine(),
            'error_file' => $e->getFile(),
            'trace' => $e->getTraceAsString()
        ]
    ]);
}
?>
