<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => true, 'message' => 'Método no permitido']);
    exit();
}

require_once 'auth_system.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Datos inválidos');
    }

    if (empty($input['identifier']) || empty($input['password'])) {
        throw new Exception('Email/usuario y contraseña son requeridos');
    }

    $auth = new AuthSystem();
    $user_data = $auth->login($input['identifier'], $input['password']);

    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión exitoso',
        'user' => $user_data
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
?>
