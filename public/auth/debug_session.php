<?php
require_once 'auth_system.php';

header('Content-Type: application/json');

try {
    $auth = new AuthSystem();
    
    // Si hay parámetros de login, intentar hacer login
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $result = $auth->login($_POST['username'], $_POST['password']);
        echo json_encode([
            'action' => 'login',
            'success' => true,
            'result' => $result,
            'session_id' => session_id(),
            'session_data' => $_SESSION
        ]);
        exit;
    }
    
    // Solo verificar sesión actual
    $user = $auth->getCurrentUser();
    
    echo json_encode([
        'action' => 'check_session',
        'session_id' => session_id(),
        'session_data' => $_SESSION,
        'user_found' => $user !== null,
        'user' => $user,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'session_id' => session_id(),
        'session_data' => $_SESSION ?? null
    ]);
}
?>
