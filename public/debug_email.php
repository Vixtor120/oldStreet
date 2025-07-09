<?php
/**
 * Script de diagnóstico para email SMTP
 * Accede a: tu-dominio.com/debug_email.php
 */

require_once 'env_loader.php';

// Solo permitir con parámetro especial
if (!isset($_GET['debug']) || $_GET['debug'] !== 'email_test') {
    die("Acceso denegado. Usa: ?debug=email_test");
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Debug Email SMTP - OldStreet</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .success { color: green; background: #f0fff0; padding: 10px; border: 1px solid green; margin: 10px 0; }
        .error { color: red; background: #fff0f0; padding: 10px; border: 1px solid red; margin: 10px 0; }
        .info { color: blue; background: #f0f0ff; padding: 10px; border: 1px solid blue; margin: 10px 0; }
        .warning { color: orange; background: #fffacd; padding: 10px; border: 1px solid orange; margin: 10px 0; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
        form { margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🔍 Diagnóstico Email SMTP</h1>
    
    <div class="info">
        <h3>📋 Variables de Entorno:</h3>
        <pre><?php
            $email_vars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'SMTP_FROM_EMAIL', 'SITE_URL'];
            foreach ($email_vars as $var) {
                $value = $_ENV[$var] ?? 'NO CONFIGURADO';
                if ($var === 'SMTP_PASSWORD') {
                    $value = $value ? '***' . substr($value, -3) : 'NO CONFIGURADO';
                }
                echo "$var: $value\n";
            }
        ?></pre>
    </div>

    <div class="info">
        <h3>⚙️ Configuración PHP:</h3>
        <pre><?php
            echo "mail() function: " . (function_exists('mail') ? "✅ Disponible" : "❌ No disponible") . "\n";
            echo "sendmail_path: " . ini_get('sendmail_path') . "\n";
            echo "SMTP: " . ini_get('SMTP') . "\n";
            echo "smtp_port: " . ini_get('smtp_port') . "\n";
        ?></pre>
    </div>

    <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
        <?php
        $test_email = $_POST['test_email'] ?? '';
        $test_method = $_POST['test_method'] ?? 'basic';
        
        if (!filter_var($test_email, FILTER_VALIDATE_EMAIL)) {
            echo '<div class="error">❌ Email no válido</div>';
        } else {
            echo '<div class="info">📧 Probando envío a: ' . htmlspecialchars($test_email) . '</div>';
            echo '<div class="info">🔧 Método: ' . htmlspecialchars($test_method) . '</div>';
            
            if ($test_method === 'basic') {
                // Prueba con mail() básico
                $result = testBasicMail($test_email);
            } else {
                // Prueba con configuración SMTP manual
                $result = testSMTPMail($test_email);
            }
            
            if ($result['success']) {
                echo '<div class="success">✅ ' . $result['message'] . '</div>';
            } else {
                echo '<div class="error">❌ ' . $result['message'] . '</div>';
                if (isset($result['debug'])) {
                    echo '<div class="warning">🔍 Debug: ' . $result['debug'] . '</div>';
                }
            }
        }
        ?>
    <?php endif; ?>

    <form method="POST">
        <h3>📬 Probar Envío de Email</h3>
        <p>
            <label>
                Email de destino:
                <input type="email" name="test_email" required placeholder="tu-email@ejemplo.com" style="margin-left: 10px; padding: 5px; width: 250px;">
            </label>
        </p>
        <p>
            <label>
                Método de prueba:
                <select name="test_method" style="margin-left: 10px; padding: 5px;">
                    <option value="basic">mail() básico de PHP</option>
                    <option value="smtp">Configuración SMTP manual</option>
                </select>
            </label>
        </p>
        <button type="submit" style="padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 5px;">
            🚀 Probar Envío
        </button>
    </form>

    <div class="warning">
        <h3>🛠️ Posibles Soluciones:</h3>
        <ol>
            <li><strong>Verificar email en Hostinger:</strong> Asegúrate de que <code>oldstreetnew@oldstreetcm.com</code> esté creado y activo</li>
            <li><strong>Probar configuraciones alternativas:</strong>
                <ul>
                    <li>SMTP_HOST=mail.oldstreetcm.com</li>
                    <li>SMTP_PORT=465 con SMTP_SECURE=ssl</li>
                </ul>
            </li>
            <li><strong>Contactar soporte Hostinger:</strong> Algunos servidores bloquean mail() por defecto</li>
            <li><strong>Usar PHPMailer:</strong> Librería más robusta para SMTP</li>
        </ol>
    </div>

    <div class="error">
        <strong>⚠️ IMPORTANTE:</strong> Elimina este archivo después de la configuración.
    </div>
</body>
</html>

<?php
function testBasicMail($email) {
    $subject = "Test Basic Mail - OldStreet";
    $message = "Este es un email de prueba enviado con mail() básico de PHP desde OldStreet RP.";
    $headers = "From: " . ($_ENV['SMTP_FROM_EMAIL'] ?? 'test@test.com') . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $sent = @mail($email, $subject, $message, $headers);
    
    if ($sent) {
        return ['success' => true, 'message' => 'Email enviado con mail() básico'];
    } else {
        $error = error_get_last();
        return [
            'success' => false, 
            'message' => 'Error con mail() básico',
            'debug' => $error ? $error['message'] : 'Sin información específica'
        ];
    }
}

function testSMTPMail($email) {
    // Configuración SMTP manual
    $smtp_host = $_ENV['SMTP_HOST'] ?? '';
    $smtp_port = $_ENV['SMTP_PORT'] ?? 587;
    $smtp_user = $_ENV['SMTP_USERNAME'] ?? '';
    $smtp_pass = $_ENV['SMTP_PASSWORD'] ?? '';
    
    if (empty($smtp_host) || empty($smtp_user) || empty($smtp_pass)) {
        return ['success' => false, 'message' => 'Configuración SMTP incompleta'];
    }
    
    // Intentar conexión SMTP básica
    $socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 10);
    
    if (!$socket) {
        return [
            'success' => false, 
            'message' => 'No se puede conectar al servidor SMTP',
            'debug' => "Error $errno: $errstr"
        ];
    }
    
    fclose($socket);
    
    // Si llegamos aquí, al menos la conexión es posible
    return [
        'success' => true, 
        'message' => 'Conexión SMTP exitosa (pero no se envió email real)',
        'debug' => "Conectado a $smtp_host:$smtp_port"
    ];
}
?>
