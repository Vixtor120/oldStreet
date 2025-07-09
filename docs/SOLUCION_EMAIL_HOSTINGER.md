# 🚨 Solución: Email No Se Envía en Hostinger

## Problema Actual:
- El botón "Enviar email" no envía nada
- No llega email de recuperación de contraseña

## 🔍 Pasos para Diagnosticar:

### 1. Verificar Configuración Básica
Accede a: `https://oldstreet.oldstreetcm.com/debug_email.php?debug=email_test`

### 2. Verificar Email en Panel Hostinger
1. **Panel Hostinger > Email**
2. **Verificar que existe:** `oldstreetnew@oldstreetcm.com`
3. **Estado:** Debe estar "Activo"
4. **Contraseña:** Confirmar que es `OldStreet!12`

### 3. Probar Configuraciones Alternativas

Edita tu archivo `.env` y prueba estas configuraciones una por una:

#### Configuración 1 (Hostinger Estándar):
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls
```

#### Configuración 2 (Dominio Específico):
```env
SMTP_HOST=mail.oldstreetcm.com
SMTP_PORT=587
SMTP_SECURE=tls
```

#### Configuración 3 (SSL):
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=ssl
```

#### Configuración 4 (Sin Encriptación):
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=25
SMTP_SECURE=
```

## 🛠️ Soluciones Paso a Paso:

### Solución 1: Verificar Email en Hostinger
1. **Panel Hostinger > Email > Gestionar**
2. **Si no existe `oldstreetnew@oldstreetcm.com`:**
   - Crear nueva cuenta de email
   - Email: `oldstreetnew@oldstreetcm.com`
   - Contraseña: `OldStreet!12`
3. **Si existe pero está inactivo:**
   - Reactivar la cuenta
   - Verificar que no esté suspendida

### Solución 2: Cambiar Configuración SMTP
1. **Editar `.env`** con configuración alternativa:
```env
SMTP_HOST=mail.oldstreetcm.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=oldstreetnew@oldstreetcm.com
SMTP_PASSWORD=OldStreet!12
SMTP_FROM_EMAIL=oldstreetnew@oldstreetcm.com
SMTP_FROM_NAME=OldStreet RP
SITE_URL=https://oldstreet.oldstreetcm.com
```

### Solución 3: Configuración PHP para Hostinger
1. **Crear/editar `.htaccess`** en la raíz:
```apache
# Configuración Email para Hostinger
php_value sendmail_path "/usr/sbin/sendmail -t -i"
php_value mail.add_x_header On
php_value SMTP "mail.oldstreetcm.com"
php_value smtp_port "587"
```

### Solución 4: Usar Gmail Como Alternativa
Si Hostinger no funciona, usa Gmail temporalmente:

1. **Configurar Gmail:**
   - Activar verificación en 2 pasos
   - Generar contraseña de aplicación

2. **Actualizar `.env`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=tu_email@gmail.com
SMTP_PASSWORD=contraseña_de_aplicacion_16_chars
SMTP_FROM_EMAIL=oldstreetnew@oldstreetcm.com
SMTP_FROM_NAME=OldStreet RP
SITE_URL=https://oldstreet.oldstreetcm.com
```

## 🧪 Herramientas de Prueba:

### 1. Debug Email:
```
https://oldstreet.oldstreetcm.com/debug_email.php?debug=email_test
```

### 2. Test Email Simple:
```
https://oldstreet.oldstreetcm.com/test_email.php?test=smtp_config
```

### 3. Logs de Error:
- **Panel Hostinger > Archivos de Error**
- Buscar errores relacionados con `mail()` o `SMTP`

## 📞 Contactar Soporte:

Si nada funciona, contacta soporte de Hostinger:

**Preguntas específicas:**
1. "¿Está habilitado mail() de PHP en mi hosting?"
2. "¿Cuál es la configuración SMTP correcta para mi dominio?"
3. "¿Hay restricciones de envío de emails?"
4. "¿Necesito configuración adicional para SMTP?"

## ⚡ Solución Rápida Temporal:

Mientras se soluciona el email, puedes:
1. **Deshabilitar la validación** temporalmente
2. **Permitir cambio de contraseña** sin email
3. **Usar WhatsApp/Discord** para enviar enlaces manuales

### Código para deshabilitar temporalmente:
En `request_password_reset.php`, línea ~70, cambiar:
```php
// $sent = sendPasswordResetEmail($email, $user['username'], $reset_link);
$sent = true; // TEMPORAL: forzar como enviado

// Mostrar el enlace directamente (SOLO PARA DEBUG)
echo json_encode([
    'success' => true,
    'message' => 'DEBUG: ' . $reset_link // ELIMINAR EN PRODUCCIÓN
]);
```

## 🔄 Orden de Pruebas Recomendado:

1. ✅ Verificar email existe en Hostinger
2. ✅ Probar debug_email.php
3. ✅ Cambiar a `mail.oldstreetcm.com`
4. ✅ Probar puerto 465 con SSL
5. ✅ Contactar soporte Hostinger
6. ✅ Usar Gmail como backup

**¡Importante!** Elimina los archivos de debug después de solucionar el problema.
