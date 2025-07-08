<?php
// PHPMailer Implementation for Whitelist
// This is a drop-in replacement for the existing mail() function 
// using the popular PHPMailer library for better email delivery

// First make sure to install PHPMailer with:
// composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Function to send mail using PHPMailer with SMTP
function send_mail_smtp($to, $subject, $message, $headers = '') {
    try {
        // Parse headers if they are passed as string
        $headerFields = [];
        if (is_string($headers) && !empty($headers)) {
            $lines = explode("\r\n", $headers);
            foreach ($lines as $line) {
                if (strpos($line, ':') !== false) {
                    list($name, $value) = explode(':', $line, 2);
                    $headerFields[trim($name)] = trim($value);
                }
            }
        }

        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);

        // Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF; // Set to DEBUG_SERVER for troubleshooting
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // SMTP server - CHANGE THIS
        $mail->SMTPAuth   = true;
        $mail->Username   = 'youremail@gmail.com'; // SMTP username - CHANGE THIS
        $mail->Password   = 'yourpassword'; // SMTP password - CHANGE THIS
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS
        $mail->Port       = 587; // TCP port to connect to
        
        // Recipients
        $mail->setFrom(isset($headerFields['From']) ? $headerFields['From'] : 'noreply@oldstreetcm.com', 'OldStreet Whitelist');
        
        // Add recipients
        foreach (explode(',', $to) as $address) {
            $mail->addAddress(trim($address));
        }
        
        // Add reply-to if set
        if (isset($headerFields['Reply-To'])) {
            $mail->addReplyTo($headerFields['Reply-To']);
        }
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = strip_tags($message);
        
        // Send the mail
        $success = $mail->send();
        
        if ($success) {
            error_log("Email successfully sent using PHPMailer SMTP");
            return true;
        } else {
            error_log("Failed to send email using PHPMailer SMTP: " . $mail->ErrorInfo);
            return false;
        }
        
    } catch (Exception $e) {
        error_log("PHPMailer Exception: " . $e->getMessage());
        return false;
    }
}

// Function to update send_whitelist.php to use PHPMailer
function update_whitelist_to_use_phpmailer() {
    $file = 'send_whitelist.php';
    $content = file_get_contents($file);
    
    if ($content === false) {
        return "Could not read file: $file";
    }
    
    // Add PHPMailer requirement at the top
    $phpmailer_inclusion = "<?php\n// Using PHPMailer for better email delivery\nrequire 'vendor/autoload.php';\n\nuse PHPMailer\\PHPMailer\\PHPMailer;\nuse PHPMailer\\PHPMailer\\Exception;\nuse PHPMailer\\PHPMailer\\SMTP;\n";
    
    // Replace the original PHP opening tag
    $content = str_replace("<?php", $phpmailer_inclusion, $content);
    
    // Find and replace the try_send_email function
    $new_function = "function try_send_email(\$to, \$subject, \$message, \$headers) {
    // First try PHPMailer if available
    if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        try {
            // Create a new PHPMailer instance
            \$mail = new PHPMailer(true);
            
            // Server settings
            \$mail->SMTPDebug = SMTP::DEBUG_OFF;
            \$mail->isSMTP();
            \$mail->Host       = 'smtp.gmail.com'; // CHANGE THIS to your SMTP server
            \$mail->SMTPAuth   = true;
            \$mail->Username   = 'youremail@gmail.com'; // CHANGE THIS to your email
            \$mail->Password   = 'yourapppassword'; // CHANGE THIS to your password
            \$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            \$mail->Port       = 587;
            
            // Parse headers
            \$headerFields = [];
            \$headerLines = explode(\"\\r\\n\", \$headers);
            foreach (\$headerLines as \$line) {
                if (strpos(\$line, ':') !== false) {
                    list(\$name, \$value) = explode(':', \$line, 2);
                    \$headerFields[trim(\$name)] = trim(\$value);
                }
            }
            
            // From address
            \$fromEmail = 'noreply@oldstreetcm.com';
            \$fromName = 'OldStreet Whitelist';
            
            if (isset(\$headerFields['From'])) {
                \$from = \$headerFields['From'];
                if (preg_match('/^(.*)<(.*)>$/', \$from, \$matches)) {
                    \$fromName = trim(\$matches[1]);
                    \$fromEmail = trim(\$matches[2]);
                } else {
                    \$fromEmail = trim(\$from);
                }
            }
            
            \$mail->setFrom(\$fromEmail, \$fromName);
            
            // Add recipients
            foreach (explode(',', \$to) as \$address) {
                \$mail->addAddress(trim(\$address));
            }
            
            // Content
            \$mail->isHTML(true);
            \$mail->Subject = \$subject;
            \$mail->Body    = \$message;
            \$mail->AltBody = strip_tags(\$message);
            
            // Send mail
            \$phpmailer_success = \$mail->send();
            
            if (\$phpmailer_success) {
                error_log(\"✓ Correo enviado correctamente usando PHPMailer\");
                return true;
            } else {
                error_log(\"⚠ Error al enviar correo usando PHPMailer: \" . \$mail->ErrorInfo);
                // Fall through to try the native mail function
            }
        } catch (Exception \$e) {
            error_log(\"PHPMailer Exception: \" . \$e->getMessage());
            // Fall through to try the native mail function
        }
    }
    
    // If PHPMailer failed or is not available, try native mail()
    \$mail_success = mail(\$to, \$subject, \$message, \$headers);
    
    if (\$mail_success) {
        error_log(\"✓ Correo enviado correctamente usando mail() nativo\");
        return true;
    }
    
    error_log(\"⚠ Error al enviar correo usando mail() nativo. Guardando en archivo...\");
    
    // Save as file for backup
    \$fallback_file = 'whitelist_emails/' . date('Y-m-d_H-i-s') . '_' . md5(\$to . time()) . '.html';
    
    // Crear directorio si no existe
    if (!file_exists('whitelist_emails')) {
        mkdir('whitelist_emails', 0777, true);
    }
    
    \$email_content = \"To: {\$to}\\r\\n\";
    \$email_content .= \"Subject: {\$subject}\\r\\n\";
    \$email_content .= \"Headers: {\$headers}\\r\\n\";
    \$email_content .= \"Date: \" . date('Y-m-d H:i:s') . \"\\r\\n\";
    \$email_content .= \"-----------------------------------\\r\\n\\r\\n\";
    \$email_content .= \$message;
    
    \$file_saved = file_put_contents(\$fallback_file, \$email_content);
    
    if (\$file_saved) {
        error_log(\"⚠ Correo guardado como archivo en {\$fallback_file} para revisión manual\");
        return true; // Consideramos éxito si al menos se guardó el archivo
    }
    
    error_log(\"✗ Error crítico: no se pudo enviar ni guardar el correo\");
    return false;
}";

    // Pattern to match the existing function
    $pattern = "/function try_send_email.*?return false;\s*}/s";
    
    if (preg_match($pattern, $content)) {
        $content = preg_replace($pattern, $new_function, $content);
        $result = file_put_contents($file . '.phpmailer.php', $content);
        if ($result !== false) {
            return "Successfully created $file.phpmailer.php";
        } else {
            return "Failed to write to $file.phpmailer.php";
        }
    } else {
        return "Could not find try_send_email function in $file";
    }
}

// Display the page
echo "<h1>PHPMailer Integration for OldStreet Whitelist</h1>";
echo "<p>This script provides an enhanced mail delivery solution using PHPMailer.</p>";

// Installation instructions
echo "<h2>Installation Steps</h2>";
echo "<ol>";
echo "<li>Install Composer if not already installed</li>";
echo "<li>Run: <code>composer require phpmailer/phpmailer</code></li>";
echo "<li>Configure your SMTP settings in this file</li>";
echo "<li>Replace the mail() function calls with send_mail_smtp()</li>";
echo "</ol>";

// Check if phpmailer is installed
echo "<h2>PHPMailer Status</h2>";
$phpmailer_installed = class_exists('PHPMailer\PHPMailer\PHPMailer');
echo "<p>PHPMailer installed: " . ($phpmailer_installed ? "✓ YES" : "✗ NO") . "</p>";

if (!$phpmailer_installed) {
    echo "<p style='color:red'>Please install PHPMailer first:</p>";
    echo "<pre>composer require phpmailer/phpmailer</pre>";
}

// Test mail form
echo "<h2>Test Mail Form</h2>";
echo "<form method='post'>";
echo "<div style='margin-bottom:10px'><label>To: <input type='email' name='to' value='oldstreetnew@oldstreetcm.com' style='width:300px'></label></div>";
echo "<div style='margin-bottom:10px'><label>Subject: <input type='text' name='subject' value='Test from PHPMailer Integration' style='width:300px'></label></div>";
echo "<div style='margin-bottom:10px'><label>Message:<br><textarea name='message' rows='5' style='width:500px'>This is a test email from the PHPMailer integration.</textarea></label></div>";
echo "<button type='submit' name='test_mail'>Send Test Email</button>";
echo "</form>";

// Process test mail
if (isset($_POST['test_mail'])) {
    echo "<h3>Test Results:</h3>";
    
    $to = $_POST['to'] ?? 'oldstreetnew@oldstreetcm.com';
    $subject = $_POST['subject'] ?? 'Test Email';
    $message = $_POST['message'] ?? 'This is a test email.';
    $headers = "From: OldStreet Whitelist <noreply@oldstreetcm.com>\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    if ($phpmailer_installed) {
        $result = send_mail_smtp($to, $subject, $message, $headers);
        echo "<p>PHPMailer Result: " . ($result ? "✓ SUCCESS" : "✗ FAILURE") . "</p>";
    } else {
        echo "<p>PHPMailer not installed, cannot test.</p>";
    }
    
    // Also try native mail function for comparison
    $mail_result = mail($to, $subject, $message, $headers);
    echo "<p>Native mail() Result: " . ($mail_result ? "✓ SUCCESS" : "✗ FAILURE") . "</p>";
}

// Generate replacement code for send_whitelist.php
echo "<h2>Update Whitelist Script</h2>";
echo "<p>This will generate a modified version of send_whitelist.php that uses PHPMailer:</p>";

if (isset($_POST['update_script'])) {
    $result = update_whitelist_to_use_phpmailer();
    echo "<p>Result: $result</p>";
    
    if (strpos($result, 'Successfully') !== false) {
        echo "<p>A new file has been created: send_whitelist.php.phpmailer.php</p>";
        echo "<p>Review this file, configure your SMTP settings, and rename it to replace the original send_whitelist.php</p>";
    }
}

echo "<form method='post'>";
echo "<button type='submit' name='update_script'>Generate PHPMailer Version</button>";
echo "</form>";

echo "<h2>Implementation Notes</h2>";
echo "<ul>";
echo "<li>You'll need to configure your SMTP server details in the script</li>";
echo "<li>For Gmail, you'll need to use an App Password, not your regular password</li>";
echo "<li>PHPMailer provides better error handling and more reliable delivery</li>";
echo "<li>The script will fall back to the native mail() function if PHPMailer fails</li>";
echo "</ul>";
?>
