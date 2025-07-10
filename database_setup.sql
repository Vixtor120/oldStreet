-- =====================================================
-- CONFIGURACIÓN DE BASE DE DATOS - OLD STREET RP
-- =====================================================
-- Ejecuta este script en tu base de datos MySQL/MariaDB
-- para crear todas las tablas necesarias del sistema

-- Crear la base de datos (opcional, si no existe)
-- CREATE DATABASE IF NOT EXISTS oldstreet_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE oldstreet_auth;

-- =====================================================
-- TABLA: users
-- =====================================================
-- Almacena información de los usuarios registrados
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    discord_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Índices para optimizar búsquedas
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_discord_id (discord_id),
    INDEX idx_active (is_active)
);

-- =====================================================
-- TABLA: whitelist_requests
-- =====================================================
-- Almacena las solicitudes de whitelist de los usuarios
CREATE TABLE IF NOT EXISTS whitelist_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relación con tabla users
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Índices para optimizar búsquedas
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- TABLA: password_reset_tokens
-- =====================================================
-- Almacena tokens para recuperación de contraseñas
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relación con tabla users
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Índices para optimizar búsquedas
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_email (email),
    INDEX idx_expires_at (expires_at),
    INDEX idx_used (used)
);

-- =====================================================
-- TABLA: sessions (opcional)
-- =====================================================
-- Almacena sesiones activas de usuarios
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Relación con tabla users
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Índices para optimizar búsquedas
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- DATOS INICIALES (opcional)
-- =====================================================

-- Insertar un usuario admin de ejemplo (opcional)
-- NOTA: Cambia estos datos por los reales antes de ejecutar
/*
INSERT INTO users (email, username, password_hash, discord_id) VALUES 
('admin@oldstreet.com', 'admin', '$2y$10$ejemplo_hash_aqui', '123456789012345678');
*/

-- =====================================================
-- CONSULTAS ÚTILES PARA VERIFICAR LA INSTALACIÓN
-- =====================================================

-- Verificar que las tablas se crearon correctamente
-- SHOW TABLES;

-- Verificar estructura de tabla users
-- DESCRIBE users;

-- Verificar estructura de tabla whitelist_requests
-- DESCRIBE whitelist_requests;

-- Verificar estructura de tabla password_reset_tokens
-- DESCRIBE password_reset_tokens;

-- Contar registros en cada tabla
-- SELECT 'users' as tabla, COUNT(*) as registros FROM users
-- UNION ALL
-- SELECT 'whitelist_requests' as tabla, COUNT(*) as registros FROM whitelist_requests
-- UNION ALL
-- SELECT 'password_reset_tokens' as tabla, COUNT(*) as registros FROM password_reset_tokens;

-- =====================================================
-- LIMPIEZA DE TOKENS EXPIRADOS (mantenimiento)
-- =====================================================
-- Ejecuta esto periódicamente para limpiar tokens vencidos
-- DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR used = TRUE;

-- =====================================================
-- SCRIPT COMPLETADO
-- =====================================================
-- Todas las tablas necesarias han sido creadas
-- El sistema está listo para funcionar