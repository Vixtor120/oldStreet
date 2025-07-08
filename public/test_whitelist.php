<?php
// Simple test script to debug the whitelist submission
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

try {
    $input = file_get_contents('php://input');
    
    if (empty($input)) {
        throw new Exception('No se recibieron datos');
    }
    
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
    }
    
    // Verificar algunos campos básicos
    if (empty($data['nombrePersonaje'])) {
        throw new Exception('El nombre del personaje es requerido');
    }
    
    if (empty($data['discord'])) {
        throw new Exception('El Discord es requerido');
    }
    
    // Simular guardado exitoso
    echo json_encode([
        'success' => true,
        'message' => 'Test exitoso! Datos recibidos correctamente',
        'debug' => [
            'nombre' => $data['nombrePersonaje'],
            'discord' => $data['discord'],
            'campos_recibidos' => count($data)
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error: ' . $e->getMessage(),
        'debug' => [
            'input_received' => !empty($input),
            'json_error' => json_last_error_msg()
        ]
    ]);
}
?>
