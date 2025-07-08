<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
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
        'discord', 'edad', 'comoEncontrasteServidor', 'queAportaras', 'otrosServidores',
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
    
    // Configuración de correo
    $to = 'oldstreetnew@oldstreetcm.com';
    $subject = '📋 Nueva Solicitud de Whitelist - ' . htmlspecialchars($data['nombrePersonaje']);
    
    // Crear el contenido HTML del correo
    $htmlContent = generateEmailHTML($data);
    
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
