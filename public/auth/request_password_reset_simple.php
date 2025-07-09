<?php
/**
 * Versión ultra-simplificada para capturar errores específicos
 * POST /auth/request_password_reset_simple.php
 */

// Suprimir todos los warnings y errors para obtener JSON limpio
error_reporting(0);
ini_set('display_errors', 0);

// Capturar cualquier output no deseado
ob_start();

// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    ob_end_clean();
    exit(0);
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$response = ['success' => false, 'message' => 'Error desconocido', 'debug' => []];

try {
    // Paso 1: Verificar datos POST
    $email = trim($_POST['email'] ?? '');
    $response['debug']['step'] = 'validating_email';
    $response['debug']['email_received'] = !empty($email);
    
    if (empty($email)) {
        $response['message'] = 'El email es requerido';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Email no válido';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 2: Verificar archivos
    $response['debug']['step'] = 'checking_files';
    $env_file_exists = file_exists('../env_loader.php');
    $auth_file_exists = file_exists('auth_system.php');
    
    $response['debug']['files'] = [
        'env_loader' => $env_file_exists,
        'auth_system' => $auth_file_exists
    ];
    
    if (!$env_file_exists) {
        $response['message'] = 'Archivo env_loader.php no encontrado';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 3: Cargar env_loader
    $response['debug']['step'] = 'loading_env';
    require_once '../env_loader.php';
    
    // Verificar variables críticas
    $env_vars = [
        'DB_HOST' => $_ENV['DB_HOST'] ?? null,
        'DB_NAME' => $_ENV['DB_NAME'] ?? null,
        'DB_USER' => $_ENV['DB_USER'] ?? null,
        'DB_PASS' => $_ENV['DB_PASS'] ?? null,
    ];
    
    $response['debug']['env_vars'] = array_map(function($var) {
        return $var ? 'SET' : 'NOT_SET';
    }, $env_vars);
    
    if (!$auth_file_exists) {
        $response['message'] = 'Archivo auth_system.php no encontrado';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 4: Cargar AuthSystem
    $response['debug']['step'] = 'loading_auth_system';
    require_once 'auth_system.php';
    
    // Paso 5: Crear instancia AuthSystem
    $response['debug']['step'] = 'creating_auth_instance';
    $auth = new AuthSystem();
    
    // Paso 6: Conectar a BD y buscar usuario
    $response['debug']['step'] = 'database_query';
    
    $query = "SELECT id, username FROM users WHERE email = ? AND is_active = TRUE LIMIT 1";
    $stmt = $auth->db->prepare($query);
    
    if (!$stmt) {
        $response['message'] = 'Error preparando consulta: ' . $auth->db->error;
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    $response['debug']['user_found'] = !empty($user);
    
    if (!$user) {
        // Por seguridad, siempre decir que se envió
        $response['success'] = true;
        $response['message'] = 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 7: Generar token
    $response['debug']['step'] = 'generating_token';
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + (60 * 60));
    
    // Paso 8: Insertar token
    $response['debug']['step'] = 'inserting_token';
    $insert_query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
    $insert_stmt = $auth->db->prepare($insert_query);
    
    if (!$insert_stmt) {
        $response['message'] = 'Error preparando inserción: ' . $auth->db->error;
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    $insert_stmt->bind_param("isss", $user['id'], $token, $email, $expires_at);
    
    if (!$insert_stmt->execute()) {
        $response['message'] = 'Error ejecutando inserción: ' . $insert_stmt->error;
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 9: Crear enlace
    $response['debug']['step'] = 'creating_link';
    $site_url = $_ENV['SITE_URL'] ?? 'https://oldstreet.oldstreetcm.com';
    $reset_link = $site_url . "/reset-password?token=" . $token;
    
    // Éxito - Sin envío de email por ahora
    $response['success'] = true;
    $response['message'] = 'Token de recuperación generado correctamente';
    $response['debug']['final_step'] = 'success';
    $response['debug']['token'] = substr($token, 0, 10) . '...'; // Solo primeros 10 chars
    $response['debug']['reset_link'] = $reset_link;
    
} catch (Exception $e) {
    $response['message'] = 'Exception: ' . $e->getMessage();
    $response['debug']['exception'] = [
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ];
} catch (Error $e) {
    $response['message'] = 'Fatal Error: ' . $e->getMessage();
    $response['debug']['fatal_error'] = [
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ];
}

// Limpiar cualquier output capturado y devolver JSON
ob_end_clean();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
