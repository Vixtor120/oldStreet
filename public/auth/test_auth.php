<?php
// Archivo de prueba para auth
echo json_encode([
    'success' => true,
    'message' => 'Directorio auth funciona',
    'timestamp' => date('Y-m-d H:i:s'),
    'files_in_dir' => scandir(__DIR__)
]);
?>
