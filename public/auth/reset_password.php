<?php
/**
 * Endpoint para resetear contraseña con token
 * POST /auth/reset_password.php
 */

require_once '../env_loader.php';
require_once 'auth_system.php';

// Configurar headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

try {
    $auth = new AuthSystem();
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Verificar si el token es válido (para mostrar el formulario)
        $token = $_GET['token'] ?? '';
        
        if (empty($token)) {
            echo json_encode(['success' => false, 'message' => 'Token requerido']);
            exit;
        }
        
        $tokenData = validateResetToken($auth, $token);
        
        if ($tokenData) {
            echo json_encode([
                'success' => true, 
                'message' => 'Token válido',
                'email' => $tokenData['email']
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Token inválido o expirado'
            ]);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Procesar el cambio de contraseña
        $token = trim($_POST['token'] ?? '');
        $new_password = trim($_POST['new_password'] ?? '');
        $confirm_password = trim($_POST['confirm_password'] ?? '');
        
        // Validaciones
        if (empty($token) || empty($new_password) || empty($confirm_password)) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
            exit;
        }
        
        if ($new_password !== $confirm_password) {
            echo json_encode(['success' => false, 'message' => 'Las contraseñas no coinciden']);
            exit;
        }
        
        if (strlen($new_password) < 6) {
            echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
            exit;
        }
        
        // Validar token
        $tokenData = validateResetToken($auth, $token);
        if (!$tokenData) {
            echo json_encode(['success' => false, 'message' => 'Token inválido o expirado']);
            exit;
        }
        
        // Actualizar contraseña
        $password_hash = password_hash($new_password, PASSWORD_DEFAULT);
        
        $query = "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        $stmt = $auth->db->prepare($query);
        $stmt->bind_param("si", $password_hash, $tokenData['user_id']);
        
        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar la contraseña");
        }
        
        // Marcar token como usado
        $query = "UPDATE password_reset_tokens SET used = TRUE, used_at = CURRENT_TIMESTAMP WHERE token = ?";
        $stmt = $auth->db->prepare($query);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        
        // Invalidar todas las sesiones existentes del usuario
        $query = "DELETE FROM user_sessions WHERE user_id = ?";
        $stmt = $auth->db->prepare($query);
        $stmt->bind_param("i", $tokenData['user_id']);
        $stmt->execute();
        
        // Log de actividad
        $auth->logActivity($tokenData['user_id'], 'password_reset_completed', 'Contraseña cambiada via token');
        
        echo json_encode([
            'success' => true,
            'message' => 'Contraseña actualizada correctamente. Por favor, inicia sesión con tu nueva contraseña.'
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    }
    
} catch (Exception $e) {
    error_log("Error en reset_password: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor'
    ]);
}

/**
 * Función para validar token de recuperación
 */
function validateResetToken($auth, $token) {
    $query = "SELECT user_id, email, expires_at, used FROM password_reset_tokens WHERE token = ?";
    $stmt = $auth->db->prepare($query);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $tokenData = $result->fetch_assoc();
    
    if (!$tokenData) {
        return false; // Token no existe
    }
    
    if ($tokenData['used']) {
        return false; // Token ya fue usado
    }
    
    if (strtotime($tokenData['expires_at']) < time()) {
        return false; // Token expirado
    }
    
    return $tokenData;
}
?>
