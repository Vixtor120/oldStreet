<?php
/**
 * Endpoint intermedio - Con base de datos pero sin email
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
            'message' => 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación',
            'debug' => ['user_found' => false]
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
    
    // Paso 8: Log de actividad
    $auth->logActivity($user['id'], 'password_reset_requested', 'Token generado - Email pendiente');
    
    // Respuesta exitosa SIN envío de email
    echo json_encode([
        'success' => true,
        'message' => 'Token de recuperación generado exitosamente',
        'debug' => [
            'user_found' => true,
            'token_generated' => true,
            'token_saved' => true,
            'reset_link' => $reset_link,
            'user_id' => $user['id'],
            'username' => $user['username']
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Error en test_with_db: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'debug' => [
            'error_line' => $e->getLine(),
            'error_file' => $e->getFile()
        ]
    ]);
}
?>
