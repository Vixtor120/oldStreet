# Configuración de Email SMTP en Hostinger

## 🎯 Paso a Paso para Hostinger

### 1. Crear Cuenta de Email

1. **Accede al panel de Hostinger:**
   - Ve a tu panel de control de Hostinger
   - Busca la sección "Email" o "Correo electrónico"

2. **Crear nueva cuenta:**
   - Haz clic en "Crear cuenta de email"
   - Email: `noreply@tu-dominio.com` (o `admin@tu-dominio.com`)
   - Contraseña: Crea una contraseña segura
   - Guarda esta contraseña, la necesitarás para el `.env`

### 2. Configurar en el .env

Usa esta configuración exacta para Hostinger:

```env
# EMAIL - Configuración SMTP de Hostinger
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=noreply@tu-dominio.com
SMTP_PASSWORD=la_password_que_creaste_en_hostinger
SMTP_FROM_EMAIL=noreply@tu-dominio.com
SMTP_FROM_NAME=OldStreet RP
SITE_URL=https://tu-dominio.com
```

### 3. Configuraciones Alternativas de Hostinger

Si `smtp.hostinger.com` no funciona, prueba estas opciones:

**Opción A:**
```env
SMTP_HOST=mail.tu-dominio.com
SMTP_PORT=587
```

**Opción B:**
```env
SMTP_HOST=smtp.titan.email
SMTP_PORT=587
```

### 4. Configuración Específica para tu Dominio

Reemplaza `tu-dominio.com` con tu dominio real. Por ejemplo:

```env
# Si tu dominio es oldstreet-rp.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=noreply@oldstreet-rp.com
SMTP_PASSWORD=tu_password_real
SMTP_FROM_EMAIL=noreply@oldstreet-rp.com
SMTP_FROM_NAME=OldStreet RP
SITE_URL=https://oldstreet-rp.com
```

## ✅ Configuración Específica para oldstreetcm.com

Con la información proporcionada, tu configuración exacta debe ser:

```env
# EMAIL - Configuración SMTP para oldstreetcm.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=oldstreetnew@oldstreetcm.com
SMTP_PASSWORD=OldStreet!12
SMTP_FROM_EMAIL=oldstreetnew@oldstreetcm.com
SMTP_FROM_NAME=OldStreet RP
SITE_URL=https://oldstreetcm.com
```

### 🧪 Probar la Configuración

1. **Sube el archivo `test_email.php` a tu servidor**
2. **Accede a:** `https://oldstreetcm.com/test_email.php?test=smtp_config`
3. **Cambia el email de prueba** por tu email personal en el código
4. **Haz clic en "Enviar Email de Prueba"**
5. **Revisa tu bandeja de entrada** (y spam)

### 🔧 Si no funciona, prueba estas alternativas:

**Opción A - Servidor alternativo:**
```env
SMTP_HOST=mail.oldstreetcm.com
```

**Opción B - Puerto SSL:**
```env
SMTP_PORT=465
SMTP_SECURE=ssl
```

**Opción C - Sin encriptación (menos seguro):**
```env
SMTP_PORT=25
SMTP_SECURE=
```

⚠️ **Importante:** Nunca compartas estos datos reales en repositorios públicos. Úsalos solo en tu archivo `.env` real.

### 5. Verificar Configuración

1. **En el panel de Hostinger:**
   - Ve a Email > Configuración
   - Verifica que la cuenta esté activa
   - Anota los datos de servidor SMTP

2. **Datos que necesitas:**
   - 📧 Email creado: `noreply@tu-dominio.com`
   - 🔐 Contraseña del email
   - 🌐 Tu dominio completo
   - 📡 Servidor SMTP (normalmente `smtp.hostinger.com`)

### 6. Solución de Problemas

**Si no funciona el envío de emails:**

1. **Verifica que el email esté activo:**
   - En Hostinger > Email > Gestionar
   - Debe aparecer como "Activo"

2. **Prueba configuraciones alternativas:**
   ```env
   # Prueba 1: Puerto 465 con SSL
   SMTP_PORT=465
   SMTP_SECURE=ssl
   
   # Prueba 2: Sin encriptación (menos seguro)
   SMTP_PORT=25
   SMTP_SECURE=
   ```

3. **Revisa los logs de error:**
   - En cPanel > Archivos de error
   - Busca errores relacionados con SMTP

### 7. Configuración Avanzada PHP

Si Hostinger requiere configuración adicional, agrega al `.htaccess`:

```apache
# Configuración SMTP para Hostinger
php_value sendmail_path "/usr/sbin/sendmail -t -i"
php_value mail.add_x_header On
```

## 🔍 Cómo Encontrar tu Configuración SMTP en Hostinger

1. **Panel de Hostinger:**
   - Email > Configuración de email
   - Busca "Configuración del servidor"

2. **Información típica de Hostinger:**
   - **Servidor SMTP:** `smtp.hostinger.com` o `mail.tu-dominio.com`
   - **Puerto:** 587 (recomendado) o 465
   - **Seguridad:** TLS (587) o SSL (465)
   - **Autenticación:** Siempre activada

## ⚠️ Importante

- **Nunca uses tu email personal principal** para SMTP automatizado
- **Crea un email específico** como `noreply@tu-dominio.com`
- **Guarda bien la contraseña** del email creado
- **Prueba el envío** antes de poner en producción
