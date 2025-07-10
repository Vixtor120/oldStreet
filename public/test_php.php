<?php
// Archivo de prueba básico para verificar PHP
echo json_encode([
    'success' => true,
    'message' => 'PHP funciona correctamente',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => PHP_VERSION,
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'N/A',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'N/A',
        'request_uri' => $_SERVER['REQUEST_URI'] ?? 'N/A',
        'current_dir' => __DIR__
    ]
]);
?>
