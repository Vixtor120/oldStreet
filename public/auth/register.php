<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes OPTIONS para CORS
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

    // Validar campos requeridos
    $required = ['email', 'username', 'password', 'discord_id'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            throw new Exception("El campo '$field' es requerido");
        }
    }

    $auth = new AuthSystem();
    $user_id = $auth->register(
        trim($input['email']),
        trim($input['username']),
        $input['password'],
        trim($input['discord_id'])
    );

    echo json_encode([
        'success' => true,
        'message' => 'Usuario registrado exitosamente. Ya puedes iniciar sesión.',
        'user_id' => $user_id
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
?>
