<?php
header('Content-Type: application/json');
h      // Configuración de correo
    $to = 'oldstreetnew@oldstreetcm.com';
    $subject = '🔔 Nueva Solicitud de Whitelist - ' . htmlspecialchars($data['nombrePersonaje']);/ Configuración de correo
    $to = 'oldstreetnew@oldstreetcm.com';
    $subject = '📋 Nueva Solicitud de Whitelist - ' . htmlspecialchars($data['nombrePersonaje']);er('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

try {
    // Obtener datos del formulario
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Datos del formulario inválidos');
    }
    
    // Validar campos requeridos
    $requiredFields = [
        'discord', 'discordUsername', 'edad', 'comoEncontrasteServidor', 'queAportaras', 'otrosServidores',
        'porQueElegirte', 'queEsRoleplay', 'loMasImportanteRoleplay', 'conceptosPocoComunes',
        'situacionSuperdeportivo', 'situacionSecuestroPolicía', 'situacionPersecucion',
        'situacionPoliciaCorrupto', 'queEsFairPlay', 'expresionMusculo', 'comandoDo',
        'ejemplosEntorno', 'rolEntorno', 'protocoloViolacion', 'nombrePersonaje',
        'historiaPersonaje'
    ];
    
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("El campo {$field} es requerido");
        }
    }
    
    // Generar ID único y token de seguridad para esta solicitud
    $whitelistId = uniqid('wl_', true);
    $securityToken = hash('sha256', $whitelistId . time() . 'oldstreet_secret_key');
    
    // Guardar la solicitud en un archivo JSON (base de datos simple)
    saveWhitelistRequest($whitelistId, $data, $securityToken);
    
    // Configuración de correo
    $to = 'oldstreetnew@oldstreetcm.com';
    $subject = '� Nueva Solicitud de Whitelist - ' . htmlspecialchars($data['nombrePersonaje']);
    
    // Crear el contenido HTML del correo con botones de validación
    $htmlContent = generateStaffEmailHTML($data, $whitelistId, $securityToken);
    
    // Headers del correo
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: OldStreet Whitelist <noreply@oldstreetcm.com>',
        'Reply-To: noreply@oldstreetcm.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // Enviar correo
    $success = mail($to, $subject, $htmlContent, implode("\r\n", $headers));
    
    if ($success) {
        echo json_encode([
            'success' => true,
            'message' => '¡Solicitud enviada exitosamente! Te contactaremos pronto.'
        ]);
    } else {
        throw new Exception('Error al enviar el correo');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

// Función para guardar solicitudes en archivo JSON
function saveWhitelistRequest($id, $data, $token) {
    $requestData = [
        'id' => $id,
        'token' => $token,
        'data' => $data,
        'status' => 'pending',
        'timestamp' => date('Y-m-d H:i:s'),
        'approved_by' => null,
        'approved_at' => null
    ];
    
    $filename = 'whitelist_requests.json';
    $requests = [];
    
    // Leer solicitudes existentes
    if (file_exists($filename)) {
        $existing = file_get_contents($filename);
        $requests = json_decode($existing, true) ?: [];
    }
    
    // Agregar nueva solicitud
    $requests[$id] = $requestData;
    
    // Guardar de vuelta al archivo
    file_put_contents($filename, json_encode($requests, JSON_PRETTY_PRINT));
}

// Función para generar el email para el staff con botones
function generateStaffEmailHTML($data, $whitelistId, $token) {
    $fecha = date('d/m/Y H:i:s');
    $approveUrl = "https://oldstreet.oldstreetcm.com/approve_whitelist.php?id={$whitelistId}&token={$token}";
    $rejectUrl = "https://oldstreet.oldstreetcm.com/reject_whitelist.php?id={$whitelistId}&token={$token}";
    
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>🚨 Nueva Solicitud de Whitelist - Staff</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #1a1a1a;
            }
            .container {
                background: #2a2a2a;
                border-radius: 10px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                border: 3px solid #ffd700;
            }
            .header {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: #ffd700;
                padding: 30px;
                text-align: center;
                position: relative;
            }
            .header h1 {
                margin: 0;
                font-size: 32px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                animation: glow 2s ease-in-out infinite alternate;
            }
            @keyframes glow {
                from { text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 10px #ffd700; }
                to { text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px #ffd700, 0 0 30px #ffd700; }
            }
            .urgent-notice {
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                padding: 15px;
                margin: 20px 0;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }
            .action-buttons {
                text-align: center;
                margin: 30px 0;
                padding: 20px;
                background: #1a1a1a;
                border-radius: 10px;
            }
            .action-buttons h3 {
                color: #ffd700;
                margin-bottom: 20px;
                font-size: 24px;
            }
            .btn {
                display: inline-block;
                padding: 15px 40px;
                margin: 10px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 18px;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .btn-approve {
                background: linear-gradient(45deg, #10b981, #059669);
                color: white;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            }
            .btn-approve:hover {
                background: linear-gradient(45deg, #059669, #047857);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
                transform: translateY(-2px);
            }
            .btn-reject {
                background: linear-gradient(45deg, #f97316, #ea580c);
                color: white;
                box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
            }
            .btn-reject:hover {
                background: linear-gradient(45deg, #ea580c, #c2410c);
                box-shadow: 0 6px 20px rgba(249, 115, 22, 0.6);
                transform: translateY(-2px);
            }
            .content {
                padding: 30px;
                background: #2a2a2a;
                color: #ffffff;
            }
            .section {
                margin-bottom: 30px;
                border-left: 4px solid #ffd700;
                padding-left: 20px;
                background: #1a1a1a;
                border-radius: 0 8px 8px 0;
                padding: 20px;
            }
            .section-title {
                color: #ffd700;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            .section-title .emoji {
                margin-right: 10px;
                font-size: 24px;
            }
            .field {
                margin-bottom: 15px;
                background: #2a2a2a;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #3a3a3a;
            }
            .field-label {
                font-weight: bold;
                color: #ffd700;
                margin-bottom: 8px;
                font-size: 14px;
            }
            .field-value {
                color: #ffffff;
                font-size: 16px;
                white-space: pre-wrap;
                word-wrap: break-word;
                line-height: 1.5;
            }
            .footer {
                background: #1a1a1a;
                padding: 20px;
                text-align: center;
                border-top: 2px solid #ffd700;
                color: #ccc;
            }
            .timestamp {
                background: #3a3a3a;
                padding: 15px;
                border-radius: 8px;
                color: #ffd700;
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .request-id {
                background: #2a2a2a;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                color: #10b981;
                border: 1px solid #3a3a3a;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🚨 NUEVA SOLICITUD DE WHITELIST</h1>
                <div style='color: #ccc; margin-top: 10px; font-size: 16px;'>
                    OldStreet Roleplay Community - Sistema de Validación Staff
                </div>
            </div>
            
            <div class='content'>
                <div class='urgent-notice'>
                    ⚡ ACCIÓN REQUERIDA DEL STAFF ⚡<br>
                    Nueva solicitud pendiente de validación
                </div>
                
                <div class='timestamp'>
                    📅 Solicitud recibida el: {$fecha}
                </div>
                
                <div class='request-id'>
                    <strong>ID de Solicitud:</strong> {$whitelistId}
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>👤</span>
                        Información Personal
                    </div>
                    <div class='field'>
                        <div class='field-label'>ID de Discord:</div>
                        <div class='field-value'>" . htmlspecialchars($data['discord']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Nombre de Usuario Discord:</div>
                        <div class='field-value'>" . htmlspecialchars($data['discordUsername']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Edad:</div>
                        <div class='field-value'>" . htmlspecialchars($data['edad']) . " años</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Cómo encontraste la comunidad?</div>
                        <div class='field-value'>" . htmlspecialchars($data['comoEncontrasteServidor']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎮</span>
                        Experiencia
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué crees que podrás aportar en la comunidad?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queAportaras']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿En qué otros servidores estuviste?</div>
                        <div class='field-value'>" . htmlspecialchars($data['otrosServidores']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Por qué te debemos dejar entrar a ti y no a otro?</div>
                        <div class='field-value'>" . htmlspecialchars($data['porQueElegirte']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>📝</span>
                        Preguntas de Roleplay
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Para ti qué es el roleplay?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queEsRoleplay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué dirías que es lo más importante en el roleplay?</div>
                        <div class='field-value'>" . htmlspecialchars($data['loMasImportanteRoleplay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Di 2 conceptos que no sean muy vistos en el roleplay:</div>
                        <div class='field-value'>" . htmlspecialchars($data['conceptosPocoComunes']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎭</span>
                        Situaciones de Roleplay
                    </div>
                    <div class='field'>
                        <div class='field-label'>Situación del superdeportivo y /auxilio - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionSuperdeportivo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Secuestro de policía - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionSecuestroPolicía']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Persecución y colisión con civil - ¿Cómo actúas?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionPersecucion']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Policía corrupto vendiendo armas - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionPoliciaCorrupto']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🔧</span>
                        Preguntas Técnicas
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué es Fair-play?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queEsFairPlay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Expresión \"músculo\" para teclas - ¿Cómo comunicar teclas?</div>
                        <div class='field-value'>" . htmlspecialchars($data['expresionMusculo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿El /do sirve para pensar?</div>
                        <div class='field-value'>" . htmlspecialchars($data['comandoDo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>2 ejemplos de /entorno:</div>
                        <div class='field-value'>" . htmlspecialchars($data['ejemplosEntorno']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Para ti qué es el rol de entorno?</div>
                        <div class='field-value'>" . htmlspecialchars($data['rolEntorno']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Protocolo para situaciones extremas (violación/mutilación):</div>
                        <div class='field-value'>" . htmlspecialchars($data['protocoloViolacion']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎭</span>
                        Información del Personaje
                    </div>
                    <div class='field'>
                        <div class='field-label'>Nombre del personaje:</div>
                        <div class='field-value'>" . htmlspecialchars($data['nombrePersonaje']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Historia del personaje:</div>
                        <div class='field-value'>" . htmlspecialchars($data['historiaPersonaje']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>⚖️</span>
                        Términos y Condiciones
                    </div>
                    <div class='field'>
                        <div class='field-label'>Dificultad percibida de la whitelist:</div>
                        <div class='field-value'>" . htmlspecialchars($data['dificultadWhitelist']) . "/10</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Acepta normativa:</div>
                        <div class='field-value' style='color: #10b981; font-weight: bold;'>✅ Sí, acepta</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Acepta revisión:</div>
                        <div class='field-value' style='color: #10b981; font-weight: bold;'>✅ Sí, acepta</div>
                    </div>
                </div>
                
                <div class='action-buttons'>
                    <h3>🚀 DECISIÓN FINAL</h3>
                    <p style='color: #ccc; margin-bottom: 25px;'>
                        Recuerda: Una vez que hagas clic, se enviará automáticamente una notificación a Discord y al usuario.
                    </p>
                    
                    <a href='{$approveUrl}' class='btn btn-approve'>
                        ✅ APROBAR WHITELIST
                    </a>
                    
                    <a href='{$rejectUrl}' class='btn btn-reject'>
                        ❌ RECHAZAR WHITELIST
                    </a>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>🏰 OldStreet Roleplay Community</strong></p>
                <p>Sistema de Validación Staff • Solicitud ID: {$whitelistId}</p>
                <p>📧 Correo generado automáticamente el {$fecha}</p>
            </div>
        </div>
    </body>
    </html>";
}

function generateEmailHTML($data) {
    $fecha = date('d/m/Y H:i:s');
    
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Solicitud de Whitelist</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: #ffd700;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            .header .subtitle {
                color: #ccc;
                margin-top: 10px;
                font-size: 14px;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 30px;
                border-left: 4px solid #ffd700;
                padding-left: 20px;
            }
            .section-title {
                color: #1a1a1a;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            .section-title .emoji {
                margin-right: 10px;
                font-size: 24px;
            }
            .field {
                margin-bottom: 15px;
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            .field-label {
                font-weight: bold;
                color: #495057;
                margin-bottom: 5px;
                font-size: 14px;
            }
            .field-value {
                color: #212529;
                font-size: 16px;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            .difficulty-bar {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .difficulty-value {
                background: #ffd700;
                color: #1a1a1a;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
            }
            .checkbox-value {
                color: #28a745;
                font-weight: bold;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                border-top: 2px solid #ffd700;
                color: #666;
                font-size: 12px;
            }
            .timestamp {
                background: #e9ecef;
                padding: 10px;
                border-radius: 5px;
                font-size: 14px;
                color: #666;
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🎮 SOLICITUD DE WHITELIST</h1>
                <div class='subtitle'>OldStreet Roleplay Community</div>
            </div>
            
            <div class='content'>
                <div class='timestamp'>
                    📅 Solicitud recibida el: {$fecha}
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>👤</span>
                        Información Personal
                    </div>
                    <div class='field'>
                        <div class='field-label'>Discord:</div>
                        <div class='field-value'>" . htmlspecialchars($data['discord']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Edad:</div>
                        <div class='field-value'>" . htmlspecialchars($data['edad']) . " años</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Cómo encontraste la comunidad?</div>
                        <div class='field-value'>" . htmlspecialchars($data['comoEncontrasteServidor']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎮</span>
                        Experiencia
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué crees que podrás aportar en la comunidad?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queAportaras']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿En qué otros servidores estuviste?</div>
                        <div class='field-value'>" . htmlspecialchars($data['otrosServidores']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Por qué te debemos dejar entrar a ti y no a otro?</div>
                        <div class='field-value'>" . htmlspecialchars($data['porQueElegirte']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>📝</span>
                        Preguntas de Roleplay
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Para ti qué es el roleplay?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queEsRoleplay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué dirías que es lo más importante en el roleplay?</div>
                        <div class='field-value'>" . htmlspecialchars($data['loMasImportanteRoleplay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Di 2 conceptos que no sean muy vistos en el roleplay:</div>
                        <div class='field-value'>" . htmlspecialchars($data['conceptosPocoComunes']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎭</span>
                        Situaciones de Roleplay
                    </div>
                    <div class='field'>
                        <div class='field-label'>Situación del superdeportivo y /auxilio - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionSuperdeportivo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Secuestro de policía - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionSecuestroPolicía']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Persecución y colisión con civil - ¿Cómo actúas?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionPersecucion']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Policía corrupto vendiendo armas - ¿Qué hay mal?</div>
                        <div class='field-value'>" . htmlspecialchars($data['situacionPoliciaCorrupto']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🔧</span>
                        Preguntas Técnicas
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Qué es Fair-play?</div>
                        <div class='field-value'>" . htmlspecialchars($data['queEsFairPlay']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Expresión \"músculo\" para teclas - ¿Cómo comunicar teclas?</div>
                        <div class='field-value'>" . htmlspecialchars($data['expresionMusculo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿El /do sirve para pensar?</div>
                        <div class='field-value'>" . htmlspecialchars($data['comandoDo']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>2 ejemplos de /entorno:</div>
                        <div class='field-value'>" . htmlspecialchars($data['ejemplosEntorno']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>¿Para ti qué es el rol de entorno?</div>
                        <div class='field-value'>" . htmlspecialchars($data['rolEntorno']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Protocolo para situaciones extremas (violación/mutilación):</div>
                        <div class='field-value'>" . htmlspecialchars($data['protocoloViolacion']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>🎭</span>
                        Información del Personaje
                    </div>
                    <div class='field'>
                        <div class='field-label'>Nombre del personaje:</div>
                        <div class='field-value'>" . htmlspecialchars($data['nombrePersonaje']) . "</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Historia del personaje:</div>
                        <div class='field-value'>" . htmlspecialchars($data['historiaPersonaje']) . "</div>
                    </div>
                </div>
                
                <div class='section'>
                    <div class='section-title'>
                        <span class='emoji'>⚖️</span>
                        Términos y Condiciones
                    </div>
                    <div class='field'>
                        <div class='field-label'>Dificultad percibida de la whitelist:</div>
                        <div class='field-value'>
                            <div class='difficulty-bar'>
                                <span>" . htmlspecialchars($data['dificultadWhitelist']) . "/10</span>
                                <div class='difficulty-value'>" . htmlspecialchars($data['dificultadWhitelist']) . "</div>
                            </div>
                        </div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Acepta normativa:</div>
                        <div class='field-value checkbox-value'>✅ Sí, acepta</div>
                    </div>
                    <div class='field'>
                        <div class='field-label'>Acepta revisión:</div>
                        <div class='field-value checkbox-value'>✅ Sí, acepta</div>
                    </div>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>OldStreet Roleplay Community</strong></p>
                <p>Solicitud procesada automáticamente • {$fecha}</p>
            </div>
        </div>
    </body>
    </html>";
}
?>
