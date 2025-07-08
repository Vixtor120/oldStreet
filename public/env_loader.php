<?php
/**
 * Cargador de variables de entorno para OldStreet Whitelist
 * 
 * Este script lee el archivo .env y carga las variables en el entorno PHP
 */

function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Ignorar comentarios
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Procesar variables
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        // Quitar comillas si existen
        if (strpos($value, '"') === 0 && strrpos($value, '"') === strlen($value) - 1) {
            $value = substr($value, 1, -1);
        } elseif (strpos($value, "'") === 0 && strrpos($value, "'") === strlen($value) - 1) {
            $value = substr($value, 1, -1);
        }
        
        putenv("$name=$value");
        $_ENV[$name] = $value;
    }
    
    return true;
}

// Cargar variables de entorno
$envPath = __DIR__ . '/.env';
loadEnv($envPath);
