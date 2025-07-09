<?php
/**
 * Script de prueba para verificar configuración de email SMTP
 * Accede a: tu-dominio.com/test_email.php?test=smtp_config
 */

require_once 'env_loader.php';

// Solo permitir con parámetro especial
if (!isset($_GET['test']) || $_GET['test'] !== 'smtp_config') {
    die("Acceso denegado. Usa: ?test=smtp_config");
}

// Configuración específica para oldstreetcm.com
$smtp_config = [
    'host' => 'smtp.hostinger.com', // o mail.oldstreetcm.com
    'port' => 587,
    'secure' => 'tls',
    'username' => 'oldstreetnew@oldstreetcm.com',
    'password' => 'OldStreet!12',
    'from_email' => 'oldstreetnew@oldstreetcm.com',
    'from_name' => 'OldStreet RP'
];

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Email SMTP - OldStreet</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        .success { color: green; background: #f0fff0; padding: 10px; border: 1px solid green; }
        .error { color: red; background: #fff0f0; padding: 10px; border: 1px solid red; }
        .info { color: blue; background: #f0f0ff; padding: 10px; border: 1px solid blue; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 5px; }
        form { margin: 20px 0; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🧪 Test de Configuración Email SMTP</h1>
    
    <div class="info">
        <strong>📋 Verificación de Variables de Entorno:</strong>
        <pre><?php
            $required_vars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'SMTP_FROM_EMAIL', 'SITE_URL'];
            foreach ($required_vars as $var) {
                $value = $_ENV[$var] ?? 'NO CONFIGURADO';
                if ($var === 'SMTP_PASSWORD') {
                    $value = $value ? '***configurado***' : 'NO CONFIGURADO';
                }
                echo "$var: $value\n";
            }
        ?></pre>
    </div>

    <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
        <?php
        $test_email = $_POST['test_email'] ?? '';
        
        if (!filter_var($test_email, FILTER_VALIDATE_EMAIL)) {
            echo '<div class="error">❌ Email no válido</div>';
        } else {
            echo '<div class="info">📧 Enviando email de prueba a: ' . htmlspecialchars($test_email) . '</div>';
            
            // Crear email de prueba
            $to = $test_email;
            $subject = "Test SMTP - OldStreet RP";
            $message = "
            <html>
            <head><title>Test Email</title></head>
            <body>
                <h2>🎉 ¡Email de prueba exitoso!</h2>
                <p>Si recibes este email, la configuración SMTP está funcionando correctamente.</p>
                <p><strong>Servidor:</strong> " . ($_ENV['SMTP_HOST'] ?? 'No configurado') . "</p>
                <p><strong>Puerto:</strong> " . ($_ENV['SMTP_PORT'] ?? 'No configurado') . "</p>
                <p><strong>Fecha:</strong> " . date('Y-m-d H:i:s') . "</p>
                <hr>
                <p><small>Este es un email automático de prueba desde OldStreet RP</small></p>
            </body>
            </html>";
            
            $headers = array(
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: ' . ($_ENV['SMTP_FROM_NAME'] ?? 'OldStreet RP') . ' <' . ($_ENV['SMTP_FROM_EMAIL'] ?? 'test@test.com') . '>',
                'Reply-To: ' . ($_ENV['SMTP_FROM_EMAIL'] ?? 'test@test.com')
            );
            
            // Intentar enviar
            $sent = mail($to, $subject, $message, implode("\r\n", $headers));
            
            if ($sent) {
                echo '<div class="success">✅ Email enviado correctamente. Revisa tu bandeja de entrada (y spam).</div>';
            } else {
                echo '<div class="error">❌ Error al enviar email. Verifica la configuración SMTP.</div>';
                
                // Mostrar información adicional para debug
                $last_error = error_get_last();
                if ($last_error) {
                    echo '<div class="error">Error PHP: ' . htmlspecialchars($last_error['message']) . '</div>';
                }
            }
        }
        ?>
    <?php endif; ?>

    <form method="POST">
        <h3>📬 Enviar Email de Prueba</h3>
        <label>
            Email de destino:
            <input type="email" name="test_email" required placeholder="tu-email@ejemplo.com" style="margin-left: 10px; padding: 5px;">
        </label>
        <br><br>
        <button type="submit" style="padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 5px;">
            🚀 Enviar Prueba
        </button>
    </form>

    <div class="info">
        <h3>🔧 Configuraciones Comunes para Hostinger:</h3>
        <pre>
# Configuración 1 (más común):
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls

# Configuración 2 (alternativa):
SMTP_HOST=mail.tu-dominio.com
SMTP_PORT=587
SMTP_SECURE=tls

# Configuración 3 (SSL):
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=ssl
        </pre>
    </div>

    <div class="error">
        <strong>⚠️ IMPORTANTE:</strong> Elimina este archivo después de configurar el email correctamente.
        Es solo para pruebas y no debe estar en producción.
    </div>

    <hr>
    <p><small>OldStreet RP - Email Test Tool</small></p>
</body>
</html>
