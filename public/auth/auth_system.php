<?php
// Configuración de sesión más robusta
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
ini_set('session.cookie_samesite', 'Lax');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../env_loader.php';

class AuthSystem {
    private $db;
    private $discord_bot_token;
    private $guild_id;
    private $whitelist_role_id;

    public function __construct() {
        $this->connectDB();
        $this->discord_bot_token = getenv('DISCORD_BOT_TOKEN');
        $this->guild_id = getenv('DISCORD_SERVER_ID');
        $this->whitelist_role_id = getenv('DISCORD_WHITELIST_ROLE_ID');
    }

    private function connectDB() {
        $host = getenv('DB_HOST') . ':' . (getenv('DB_PORT') ?: '3306');
        $dbname = getenv('DB_NAME');
        $username = getenv('DB_USER');
        $password = getenv('DB_PASS');

        try {
            $this->db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error de conexión a la base de datos: " . $e->getMessage());
            throw new Exception("Error de conexión a la base de datos");
        }
    }

    public function register($email, $username, $password, $discord_id) {
        // Validar datos
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Email inválido");
        }

        if (strlen($username) < 3 || strlen($username) > 50) {
            throw new Exception("El nombre de usuario debe tener entre 3 y 50 caracteres");
        }

        if (strlen($password) < 6) {
            throw new Exception("La contraseña debe tener al menos 6 caracteres");
        }

        if (!preg_match('/^[0-9]{17,19}$/', $discord_id)) {
            throw new Exception("ID de Discord inválido (debe ser un número de 17-19 dígitos)");
        }

        // Verificar si el usuario ya existe
        $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ? OR username = ? OR discord_id = ?");
        $stmt->execute([$email, $username, $discord_id]);
        if ($stmt->fetch()) {
            throw new Exception("Ya existe un usuario con ese email, nombre de usuario o ID de Discord");
        }

        // Verificar roles de Discord
        $discord_roles = $this->getDiscordUserRoles($discord_id);
        $has_whitelist = in_array($this->whitelist_role_id, $discord_roles);

        // Crear usuario
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("
            INSERT INTO users (email, username, password_hash, discord_id, discord_roles, has_whitelist) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $email, 
            $username, 
            $password_hash, 
            $discord_id, 
            json_encode($discord_roles), 
            $has_whitelist
        ]);

        $user_id = $this->db->lastInsertId();

        // Log de actividad
        $this->logActivity($user_id, 'user_registered', "Usuario registrado: $username");

        return $user_id;
    }

    public function login($identifier, $password) {
        $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        
        // Verificar intentos de login
        $this->checkLoginAttempts($ip_address);

        // El identificador puede ser email o username
        $stmt = $this->db->prepare("SELECT * FROM users WHERE (email = ? OR username = ?) AND is_active = 1");
        $stmt->execute([$identifier, $identifier]);
        $user = $stmt->fetch();

        // Registrar intento de login
        $this->recordLoginAttempt($ip_address, $identifier, $user && password_verify($password, $user['password_hash']));

        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new Exception("Email/usuario o contraseña incorrectos");
        }

        // Actualizar roles de Discord
        $this->updateUserDiscordRoles($user['id'], $user['discord_id']);
        
        // Recargar datos del usuario después de actualizar roles
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$user['id']]);
        $user = $stmt->fetch();

        // Limpiar sesiones expiradas del usuario
        $this->cleanExpiredSessions($user['id']);

        // Crear nueva sesión
        $session_token = bin2hex(random_bytes(32));
        $session_timeout = getenv('SESSION_TIMEOUT') ?: 7200; // Default 2 horas en segundos
        $expires_at = date('Y-m-d H:i:s', time() + $session_timeout);

        $stmt = $this->db->prepare("
            INSERT INTO user_sessions (user_id, session_token, expires_at, user_agent, ip_address) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $user['id'], 
            $session_token, 
            $expires_at, 
            $_SERVER['HTTP_USER_AGENT'] ?? '', 
            $ip_address
        ]);

        // Guardar en sesión PHP
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['session_token'] = $session_token;
        
        // Debug logging
        error_log("Login successful: User ID = " . $user['id'] . ", Token = " . $session_token);
        error_log("Session expires at: " . $expires_at);

        // Log de actividad
        $this->logActivity($user['id'], 'user_login', "Usuario inició sesión desde IP: $ip_address");

        return [
            'user_id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'discord_id' => $user['discord_id'],
            'has_whitelist' => (bool)$user['has_whitelist'],
            'session_token' => $session_token
        ];
    }

    public function logout() {
        if (isset($_SESSION['session_token'])) {
            // Eliminar sesión de la base de datos
            $stmt = $this->db->prepare("DELETE FROM user_sessions WHERE session_token = ?");
            $stmt->execute([$_SESSION['session_token']]);

            // Log de actividad
            if (isset($_SESSION['user_id'])) {
                $this->logActivity($_SESSION['user_id'], 'user_logout', 'Usuario cerró sesión');
            }
        }
        
        // Destruir sesión PHP
        session_destroy();
    }

    public function getCurrentUser() {
        // Debug logging
        error_log("getCurrentUser: SESSION user_id = " . ($_SESSION['user_id'] ?? 'null'));
        error_log("getCurrentUser: SESSION token = " . ($_SESSION['session_token'] ?? 'null'));
        
        if (!isset($_SESSION['user_id']) || !isset($_SESSION['session_token'])) {
            error_log("getCurrentUser: No session data found");
            return null;
        }

        // Verificar sesión en base de datos
        $stmt = $this->db->prepare("
            SELECT u.*, s.expires_at 
            FROM users u 
            JOIN user_sessions s ON u.id = s.user_id 
            WHERE u.id = ? AND s.session_token = ? AND s.expires_at > NOW() AND u.is_active = 1
        ");
        $stmt->execute([$_SESSION['user_id'], $_SESSION['session_token']]);
        $user = $stmt->fetch();

        if (!$user) {
            error_log("getCurrentUser: User not found in DB or session expired");
            
            // Verificar si la sesión existe pero está expirada
            $stmt = $this->db->prepare("
                SELECT expires_at FROM user_sessions 
                WHERE user_id = ? AND session_token = ?
            ");
            $stmt->execute([$_SESSION['user_id'], $_SESSION['session_token']]);
            $session = $stmt->fetch();
            
            if ($session) {
                error_log("getCurrentUser: Session found but expired at: " . $session['expires_at']);
            } else {
                error_log("getCurrentUser: Session not found in database");
            }
            
            $this->logout();
            return null;
        }

        error_log("getCurrentUser: User found successfully: " . $user['username']);

        // Actualizar roles de Discord periódicamente (cada hora)
        $last_check = strtotime($user['last_discord_check']);
        if (time() - $last_check > 3600) { // 1 hora
            $this->updateUserDiscordRoles($user['id'], $user['discord_id']);
            
            // Recargar datos del usuario
            $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$user['id']]);
            $user = $stmt->fetch();
        }

        return $user;
    }

    private function getDiscordUserRoles($discord_id) {
        if (empty($this->discord_bot_token) || empty($discord_id)) {
            return [];
        }

        $url = "https://discord.com/api/v10/guilds/{$this->guild_id}/members/{$discord_id}";
        
        $options = [
            'http' => [
                'header' => [
                    "Authorization: Bot {$this->discord_bot_token}",
                    "Content-Type: application/json",
                ],
                'method' => 'GET',
                'ignore_errors' => true,
                'timeout' => 10
            ]
        ];

        $context = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);

        if ($result === false) {
            error_log("Error al obtener roles de Discord para usuario: $discord_id");
            return [];
        }

        $data = json_decode($result, true);
        return isset($data['roles']) ? $data['roles'] : [];
    }

    private function updateUserDiscordRoles($user_id, $discord_id) {
        $discord_roles = $this->getDiscordUserRoles($discord_id);
        $has_whitelist = in_array($this->whitelist_role_id, $discord_roles);

        $stmt = $this->db->prepare("
            UPDATE users 
            SET discord_roles = ?, has_whitelist = ?, last_discord_check = NOW() 
            WHERE id = ?
        ");
        $stmt->execute([json_encode($discord_roles), $has_whitelist, $user_id]);

        // Log si cambió el estado de whitelist
        $stmt = $this->db->prepare("SELECT has_whitelist FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $current_whitelist = $stmt->fetchColumn();
        
        if ($current_whitelist != $has_whitelist) {
            $action = $has_whitelist ? 'whitelist_gained' : 'whitelist_lost';
            $this->logActivity($user_id, $action, "Estado de whitelist actualizado: " . ($has_whitelist ? 'ganado' : 'perdido'));
        }
    }

    public function checkWhitelistAccess($user) {
        return !$user['has_whitelist']; // Solo puede acceder si NO tiene whitelist
    }

    public function checkPostulacionesAccess($user) {
        return $user['has_whitelist']; // Solo puede acceder si tiene whitelist
    }

    private function checkLoginAttempts($ip_address) {
        // Verificar intentos fallidos en la última hora
        $stmt = $this->db->prepare("
            SELECT COUNT(*) FROM login_attempts 
            WHERE ip_address = ? AND success = 0 AND attempted_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)
        ");
        $stmt->execute([$ip_address]);
        $failed_attempts = $stmt->fetchColumn();

        if ($failed_attempts >= 5) {
            throw new Exception("Demasiados intentos fallidos. Intenta de nuevo en una hora.");
        }
    }

    private function recordLoginAttempt($ip_address, $identifier, $success) {
        $stmt = $this->db->prepare("
            INSERT INTO login_attempts (ip_address, email_or_username, success) 
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$ip_address, $identifier, $success]);
    }

    private function cleanExpiredSessions($user_id = null) {
        if ($user_id) {
            $stmt = $this->db->prepare("DELETE FROM user_sessions WHERE user_id = ? AND expires_at < NOW()");
            $stmt->execute([$user_id]);
        } else {
            $stmt = $this->db->prepare("DELETE FROM user_sessions WHERE expires_at < NOW()");
            $stmt->execute();
        }
    }

    private function logActivity($user_id, $action, $details = null) {
        $stmt = $this->db->prepare("
            INSERT INTO activity_logs (user_id, action, details, ip_address, user_agent) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $user_id,
            $action,
            $details,
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? ''
        ]);
    }

    // Método para obtener estadísticas (opcional, para admin)
    public function getStats() {
        $stats = [];
        
        // Total de usuarios
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM users WHERE is_active = 1");
        $stmt->execute();
        $stats['total_users'] = $stmt->fetchColumn();
        
        // Usuarios con whitelist
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM users WHERE has_whitelist = 1 AND is_active = 1");
        $stmt->execute();
        $stats['users_with_whitelist'] = $stmt->fetchColumn();
        
        // Sesiones activas
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM user_sessions WHERE expires_at > NOW()");
        $stmt->execute();
        $stats['active_sessions'] = $stmt->fetchColumn();
        
        return $stats;
    }
}
?>
