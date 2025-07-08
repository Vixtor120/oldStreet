<?php
// test_email.php - Archivo de prueba para verificar el envío de correos

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>🧪 Test de envío de correo</h2>";

// Datos de prueba
$testData = [
    'discord' => '123456789012345678',
    'discordUsername' => 'usuario_ejemplo',
    'edad' => '25',
    'comoEncontrasteServidor' => 'Por un amigo',
    'queAportaras' => 'Experiencia en roleplay y buenas historias',
    'otrosServidores' => 'Servidor de prueba anterior',
    'porQueElegirte' => 'Porque soy responsable y creativo',
    'queEsRoleplay' => 'Interpretar un personaje de manera realista',
    'loMasImportanteRoleplay' => 'La coherencia y el respeto',
    'conceptosPocoComunes' => 'Roleplay psicológico y desarrollo de traumas',
    'situacionSuperdeportivo' => 'No se puede pedir auxilio inmediatamente sin rolear las consecuencias',
    'situacionSecuestroPolicía' => 'Necesitas más policías en servicio para esta acción',
    'situacionPersecucion' => 'Ayudar al civil y continuar el roleplay apropiadamente',
    'situacionPoliciaCorrupto' => 'Necesita autorización de administración para corrupción policial',
    'queEsFairPlay' => 'Jugar limpio y dar oportunidades a otros',
    'expresionMusculo' => 'No se puede usar músculo, se debe explicar las acciones claramente',
    'comandoDo' => 'No, el /do es para describir el entorno, no pensamientos',
    'ejemplosEntorno' => 'Ejemplo 1: Llueve fuertemente. Ejemplo 2: Se escuchan sirenas a lo lejos',
    'rolEntorno' => 'Describir el ambiente y situaciones que afectan a todos',
    'protocoloViolacion' => 'Necesita consentimiento OOC y supervisión de admin',
    'nombrePersonaje' => 'Juan Pérez',
    'historiaPersonaje' => 'Un mecánico que llegó a Los Santos buscando nuevas oportunidades...',
    'dificultadWhitelist' => '7',
    'aceptarNormativa' => true,
    'aceptarRevision' => true
];

// Configuración de correo
$to = 'oldstreetnew@oldstreetcm.com';
$subject = '🧪 TEST - Nueva Solicitud de Whitelist - ' . $testData['nombrePersonaje'];

// Incluir la función de generación de HTML del archivo principal
function generateEmailHTML($data) {
    $fecha = date('d/m/Y H:i:s');
    
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>TEST - Solicitud de Whitelist</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
            .container { background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffd700; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .test-notice { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #ffeaa7; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🧪 TEST - SOLICITUD DE WHITELIST</h1>
                <div style='color: #ccc; margin-top: 10px;'>OldStreet Roleplay Community</div>
            </div>
            
            <div class='content'>
                <div class='test-notice'>
                    <strong>⚠️ ESTO ES UNA PRUEBA</strong><br>
                    Este correo fue generado automáticamente para probar el sistema de envío.
                </div>
                
                <p><strong>📅 Fecha de prueba:</strong> {$fecha}</p>
                <p><strong>👤 Discord:</strong> " . htmlspecialchars($data['discord']) . "</p>
                <p><strong>🎭 Personaje:</strong> " . htmlspecialchars($data['nombrePersonaje']) . "</p>
                <p><strong>✅ Estado:</strong> Sistema funcionando correctamente</p>
            </div>
        </div>
    </body>
    </html>";
}

$htmlContent = generateEmailHTML($testData);

// Headers del correo
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: OldStreet TEST <noreply@oldstreetcm.com>',
    'Reply-To: noreply@oldstreetcm.com',
    'X-Mailer: PHP/' . phpversion()
];

echo "<p><strong>📧 Destinatario:</strong> $to</p>";
echo "<p><strong>📋 Asunto:</strong> $subject</p>";
echo "<hr>";

// Intentar enviar correo
echo "<h3>🚀 Enviando correo de prueba...</h3>";

$success = mail($to, $subject, $htmlContent, implode("\r\n", $headers));

if ($success) {
    echo "<div style='color: green; background: #d4edda; padding: 15px; border-radius: 5px; border: 1px solid #c3e6cb;'>";
    echo "<strong>✅ ¡Éxito!</strong><br>";
    echo "El correo de prueba se envió correctamente.";
    echo "</div>";
} else {
    echo "<div style='color: #721c24; background: #f8d7da; padding: 15px; border-radius: 5px; border: 1px solid #f5c6cb;'>";
    echo "<strong>❌ Error</strong><br>";
    echo "No se pudo enviar el correo. Verifica la configuración del servidor.";
    echo "</div>";
}

echo "<hr>";
echo "<h3>📄 Vista previa del correo:</h3>";
echo "<div style='border: 2px solid #ddd; padding: 20px; background: white;'>";
echo $htmlContent;
echo "</div>";
?>

<style>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}
</style>
