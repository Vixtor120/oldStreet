<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'auth_system.php';

try {
    $auth = new AuthSystem();
    $user = $auth->getCurrentUser();

    if ($user) {
        echo json_encode([
            'authenticated' => true,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'discord_id' => $user['discord_id'],
                'has_whitelist' => (bool)$user['has_whitelist'],
                'can_access_whitelist' => $auth->checkWhitelistAccess($user),
                'can_access_postulaciones' => $auth->checkPostulacionesAccess($user)
            ]
        ]);
    } else {
        echo json_encode([
            'authenticated' => false,
            'user' => null
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
?>
