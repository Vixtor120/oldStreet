<?php
/**
 * Script de debug para el sistema de recuperación de contraseña
 * Úsalo para diagnosticar problemas paso a paso
 */

// Configurar reportes de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug_recovery.log');

echo "<h2>🔍 Debug Sistema de Recuperación de Contraseña</h2>";
echo "<hr>";

// Paso 1: Verificar archivos necesarios
echo "<h3>1. Verificando archivos necesarios:</h3>";
$files = [
    '../env_loader.php',
    'auth_system.php',
    '../vendor/autoload.php',
    '../.env'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        echo "✅ $file existe<br>";
    } else {
        echo "❌ $file NO existe<br>";
    }
}

// Paso 2: Cargar variables de entorno
echo "<h3>2. Cargando variables de entorno:</h3>";
try {
    require_once '../env_loader.php';
    echo "✅ Variables de entorno cargadas<br>";
    
    // Verificar variables críticas (sin mostrar valores sensibles)
    $env_vars = [
        'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS',
        'SMTP_HOST', 'SMTP_USERNAME', 'SMTP_PASSWORD'
    ];
    
    foreach ($env_vars as $var) {
        if (getenv($var) !== false) {
            echo "✅ $var: " . (strlen(getenv($var)) > 0 ? 'configurado' : 'vacío') . "<br>";
        } else {
            echo "❌ $var: NO configurado<br>";
        }
    }
    
} catch (Exception $e) {
    echo "❌ Error cargando variables: " . $e->getMessage() . "<br>";
}

// Paso 3: Verificar conexión a la base de datos
echo "<h3>3. Verificando conexión a la base de datos:</h3>";
try {
    require_once 'auth_system.php';
    $auth = new AuthSystem();
    echo "✅ Conexión a base de datos exitosa<br>";
    
    // Verificar que existe la tabla password_reset_tokens
    $stmt = $auth->db->prepare("SHOW TABLES LIKE 'password_reset_tokens'");
    $stmt->execute();
    if ($stmt->fetch()) {
        echo "✅ Tabla 'password_reset_tokens' existe<br>";
    } else {
        echo "❌ Tabla 'password_reset_tokens' NO existe<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Error de conexión: " . $e->getMessage() . "<br>";
}

// Paso 4: Verificar PHPMailer
echo "<h3>4. Verificando PHPMailer:</h3>";
try {
    require_once '../vendor/autoload.php';
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    $mail = new PHPMailer(true);
    echo "✅ PHPMailer cargado correctamente<br>";
    
} catch (Exception $e) {
    echo "❌ Error con PHPMailer: " . $e->getMessage() . "<br>";
}

// Paso 5: Probar función de email (sin enviar)
echo "<h3>5. Probando configuración SMTP:</h3>";
try {
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'] ?? 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'] ?? '';
    $mail->Password = $_ENV['SMTP_PASSWORD'] ?? '';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['SMTP_PORT'] ?? 587;
    
    echo "✅ Configuración SMTP aplicada<br>";
    echo "📧 Host: " . $mail->Host . "<br>";
    echo "📧 Port: " . $mail->Port . "<br>";
    echo "📧 Username: " . (strlen($mail->Username) > 0 ? 'configurado' : 'vacío') . "<br>";
    
} catch (Exception $e) {
    echo "❌ Error configurando SMTP: " . $e->getMessage() . "<br>";
}

// Paso 6: Probar el endpoint completo con datos ficticios
echo "<h3>6. Probando endpoint con email ficticio:</h3>";
if (isset($_POST['test_email'])) {
    $test_email = $_POST['test_email'];
    
    echo "🧪 Probando con email: $test_email<br>";
    
    try {
        $auth = new AuthSystem();
        $user = $auth->getUserByEmail($test_email);
        
        if ($user) {
            echo "✅ Usuario encontrado: " . $user['username'] . "<br>";
            
            // Generar token de prueba
            $token = bin2hex(random_bytes(32));
            $expires_at = date('Y-m-d H:i:s', time() + 86400);
            
            // Probar inserción del token
            $query = "INSERT INTO password_reset_tokens (user_id, token, email, expires_at) VALUES (?, ?, ?, ?)";
            $stmt = $auth->db->prepare($query);
            
            if ($stmt->execute([$user['id'], $token, $test_email, $expires_at])) {
                echo "✅ Token insertado correctamente<br>";
                echo "🔑 Token generado: " . substr($token, 0, 20) . "...<br>";
                
                // Limpiar el token de prueba
                $stmt = $auth->db->prepare("DELETE FROM password_reset_tokens WHERE token = ?");
                $stmt->execute([$token]);
                echo "🧹 Token de prueba eliminado<br>";
            } else {
                echo "❌ Error insertando token<br>";
            }
            
        } else {
            echo "ℹ️ Usuario no encontrado con ese email<br>";
        }
        
    } catch (Exception $e) {
        echo "❌ Error en prueba: " . $e->getMessage() . "<br>";
    }
}

?>

<hr>
<h3>Formulario de Prueba:</h3>
<form method="POST">
    <label>Email de prueba:</label>
    <input type="email" name="test_email" placeholder="test@example.com" required>
    <button type="submit">Probar Endpoint</button>
</form>

<hr>
<p><strong>Nota:</strong> Este archivo es solo para debugging. Elimínalo después de solucionar el problema.</p>
