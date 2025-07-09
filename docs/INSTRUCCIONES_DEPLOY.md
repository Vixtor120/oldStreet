# Instrucciones de Despliegue a Hostinger - V2.0

## 🎉 NUEVO: Sistema de Notificaciones Elegantes

Esta versión incluye un sistema de notificaciones modales completamente rediseñado que reemplaza los alerts básicos por modales elegantes y acordes al diseño de la web.

### ✨ Características nuevas:
- **Notificaciones animadas** con efectos visuales
- **4 tipos de notificaciones**: Éxito (verde), Error (rojo), Advertencia (amarillo), Info (azul)
- **Auto-close inteligente**: Las notificaciones se cierran automáticamente según su tipo
- **Efectos de backdrop** y animaciones suaves
- **Diseño coherente** con el tema de la web (dorado/negro)

## Archivos que debes subir:

### 1. Frontend (React construido):
- Ve a la carpeta `dist/` (que se acaba de crear)
- Sube TODOS los archivos de `dist/` a la **carpeta raíz** de tu dominio en Hostinger (public_html)

### 2. Backend (PHP):
- Sube la carpeta `public/` completa a la **carpeta raíz** de tu dominio en Hostinger
- Asegúrate de que los archivos PHP estén en la raíz, no en una subcarpeta

### 3. Estructura final en Hostinger:
```
public_html/
├── index.html (del dist/)
├── assets/ (del dist/)
├── auth/
│   ├── auth_system.php
│   ├── login.php
│   ├── register.php
│   ├── check_session.php
│   ├── logout.php
│   └── debug_session.php
├── .env
├── env_loader.php
├── send_whitelist.php
├── approve_whitelist.php
├── reject_whitelist.php
├── test_whitelist.php
└── images/
```

## Pasos para subir:

1. **Conectar por FTP/File Manager de Hostinger**
2. **Ir a public_html/**
3. **Borrar todo el contenido existente**
4. **Subir archivos del dist/:**
   - index.html
   - carpeta assets/
5. **Subir archivos de public/:**
   - carpeta auth/ completa (incluyendo debug_session.php)
   - archivo .env
   - archivo env_loader.php
   - todos los archivos .php
   - carpeta images/

## Verificación:

Después de subir, deberías poder acceder a:
- `https://tu-dominio.com/` (página principal)
- `https://tu-dominio.com/auth/check_session.php` (debería devolver JSON)
- `https://tu-dominio.com/auth/debug_session.php` (para debugging de sesiones)

## Diagnóstico del problema de sesiones:

Si el login sigue fallando después del despliegue:

1. **Accede a** `https://tu-dominio.com/auth/debug_session.php`
2. **Revisa los logs de error** en Hostinger (cPanel > Archivos de error)
3. **Busca mensajes como:**
   - "getCurrentUser: No session data found"
   - "getCurrentUser: Session found but expired at: ..."
   - "Login successful: User ID = ..."

### Test manual de login:
Puedes probar el login enviando un POST a `debug_session.php`:
```bash
# Usando curl (o Postman)
curl -X POST https://tu-dominio.com/auth/debug_session.php \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=tu_usuario&password=tu_password"
```

## Configuración de Base de Datos:

1. Ve al panel de MySQL en Hostinger
2. Ejecuta el script `database_setup.sql` completo
3. Verifica que las tablas se crearon correctamente

## 🔧 Mejoras implementadas en esta versión:

1. **Sistema de Notificaciones Elegantes:**
   - Reemplazado todos los `alert()` por modales elegantes
   - Notificaciones de éxito para login/registro exitoso
   - Notificaciones de error con mejor UX
   - Notificaciones de advertencia para casos especiales

2. **Mejoras de Autenticación:**
   - Mejor logging y debugging de sesiones
   - Configuración más robusta de cookies y sesiones
   - Archivo `debug_session.php` para diagnóstico

3. **Experiencia de Usuario Mejorada:**
   - Mensajes más claros y descriptivos
   - Efectos visuales y animaciones
   - Consistent con el tema visual del sitio
   - **NUEVO**: Layout 2x2 homogéneo para los pasos de incorporación

## Problemas comunes:

1. **Si no funciona el login (logout inmediato):**
   - **Causa más probable**: Configuración de sesiones PHP en Hostinger
   - **Solución 1**: Verifica que el archivo `.env` esté en la raíz
   - **Solución 2**: Revisa los logs de error en cPanel
   - **Solución 3**: Usa `debug_session.php` para ver los detalles
   - **Solución 4**: Cambia `SESSION_TIMEOUT=7200` a `SESSION_TIMEOUT=86400` (24 horas)

2. **Si aparece error 404 en los archivos PHP:**
   - Verifica que los archivos estén en la raíz de public_html
   - No deben estar en subcarpetas

3. **Si el frontend no carga:**
   - Asegúrate de que index.html esté en la raíz
   - Verifica que la carpeta assets/ esté junto al index.html

4. **Si las sesiones no persisten:**
   - Agrega al `.htaccess` en la raíz:
   ```apache
   php_value session.cookie_lifetime 86400
   php_value session.gc_maxlifetime 86400
   ```
