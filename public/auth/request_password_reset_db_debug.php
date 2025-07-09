<?php
/**
 * Versión con debug de conexión a base de datos
 * POST /auth/request_password_reset_db_debug.php
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
    // Paso 1: Validar email
    $email = trim($_POST['email'] ?? '');
    $response['debug']['step'] = 'validating_email';
    $response['debug']['email_received'] = !empty($email);
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Email inválido';
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 2: Cargar archivos
    $response['debug']['step'] = 'loading_files';
    require_once '../env_loader.php';
    
    // Verificar variables de BD específicamente
    $db_config = [
        'host' => $_ENV['DB_HOST'] ?? null,
        'name' => $_ENV['DB_NAME'] ?? null,
        'user' => $_ENV['DB_USER'] ?? null,
        'pass' => $_ENV['DB_PASS'] ?? null,
    ];
    
    $response['debug']['db_config'] = [
        'host' => $db_config['host'] ? 'SET' : 'NOT_SET',
        'name' => $db_config['name'] ? 'SET' : 'NOT_SET', 
        'user' => $db_config['user'] ? 'SET' : 'NOT_SET',
        'pass' => $db_config['pass'] ? 'SET' : 'NOT_SET'
    ];
    
    // Verificar que todas las variables estén configuradas
    foreach ($db_config as $key => $value) {
        if (empty($value)) {
            $response['message'] = "Variable de BD faltante: DB_" . strtoupper($key);
            $response['debug']['missing_var'] = $key;
            ob_end_clean();
            echo json_encode($response);
            exit;
        }
    }
    
    // Paso 3: Conectar directamente a BD (sin AuthSystem)
    $response['debug']['step'] = 'connecting_to_database';
    
    try {
        $dsn = "mysql:host={$db_config['host']};port=3306;dbname={$db_config['name']};charset=utf8mb4";
        $pdo = new PDO($dsn, $db_config['user'], $db_config['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        
        $response['debug']['db_connection'] = 'SUCCESS';
        
    } catch (PDOException $e) {
        $response['message'] = 'Error de conexión a BD: ' . $e->getMessage();
        $response['debug']['db_connection'] = 'FAILED';
        $response['debug']['db_error'] = $e->getMessage();
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 4: Verificar que la tabla users existe
    $response['debug']['step'] = 'checking_users_table';
    
    try {
        $stmt = $pdo->query("DESCRIBE users");
        $columns = $stmt->fetchAll();
        $response['debug']['users_table'] = 'EXISTS';
        $response['debug']['users_columns'] = array_column($columns, 'Field');
        
    } catch (PDOException $e) {
        $response['message'] = 'Tabla users no existe: ' . $e->getMessage();
        $response['debug']['users_table'] = 'NOT_EXISTS';
        $response['debug']['table_error'] = $e->getMessage();
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 5: Verificar que la tabla password_reset_tokens existe
    $response['debug']['step'] = 'checking_tokens_table';
    
    try {
        $stmt = $pdo->query("DESCRIBE password_reset_tokens");
        $columns = $stmt->fetchAll();
        $response['debug']['tokens_table'] = 'EXISTS';
        $response['debug']['tokens_columns'] = array_column($columns, 'Field');
        
    } catch (PDOException $e) {
        $response['message'] = 'Tabla password_reset_tokens no existe: ' . $e->getMessage();
        $response['debug']['tokens_table'] = 'NOT_EXISTS';
        $response['debug']['tokens_error'] = $e->getMessage();
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 6: Buscar usuario
    $response['debug']['step'] = 'searching_user';
    
    try {
        $stmt = $pdo->prepare("SELECT id, username FROM users WHERE email = ? AND is_active = TRUE LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        $response['debug']['user_search'] = 'SUCCESS';
        $response['debug']['user_found'] = !empty($user);
        
        if (!$user) {
            $response['success'] = true;
            $response['message'] = 'Si el email existe, recibirás un enlace';
            $response['debug']['reason'] = 'user_not_found';
            ob_end_clean();
            echo json_encode($response);
            exit;
        }
        
    } catch (PDOException $e) {
        $response['message'] = 'Error buscando usuario: ' . $e->getMessage();
        $response['debug']['user_search'] = 'FAILED';
        $response['debug']['search_error'] = $e->getMessage();
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Paso 7: Generar e insertar token
    $response['debug']['step'] = 'creating_token';
    
    $token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', time() + (60 * 60));
    
    try {
        $stmt = $pdo->prepare("INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user['id'], $token, $email, $expires_at]);
        
        $response['debug']['token_creation'] = 'SUCCESS';
        $response['debug']['token_id'] = $pdo->lastInsertId();
        
    } catch (PDOException $e) {
        $response['message'] = 'Error creando token: ' . $e->getMessage();
        $response['debug']['token_creation'] = 'FAILED';
        $response['debug']['token_error'] = $e->getMessage();
        ob_end_clean();
        echo json_encode($response);
        exit;
    }
    
    // Éxito total
    $site_url = $_ENV['SITE_URL'] ?? 'https://oldstreet.oldstreetcm.com';
    $reset_link = $site_url . "/reset-password?token=" . $token;
    
    $response['success'] = true;
    $response['message'] = 'Token de recuperación creado exitosamente';
    $response['debug']['final_step'] = 'complete_success';
    $response['debug']['reset_link'] = $reset_link;
    $response['debug']['token_preview'] = substr($token, 0, 8) . '...';
    
} catch (Exception $e) {
    $response['message'] = 'Exception: ' . $e->getMessage();
    $response['debug']['exception'] = [
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'message' => $e->getMessage()
    ];
} catch (Error $e) {
    $response['message'] = 'Fatal Error: ' . $e->getMessage();
    $response['debug']['fatal_error'] = [
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'message' => $e->getMessage()
    ];
}

// Limpiar cualquier output capturado y devolver JSON
ob_end_clean();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
