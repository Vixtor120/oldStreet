# 🔧 GUÍA DE DEBUGGING PASO A PASO - ERROR 404

## ⚠️ PROBLEMA ACTUAL
El servidor devuelve una página 404 de Hostinger en lugar de ejecutar PHP, lo que significa que hay un problema con la configuración del servidor o la estructura de archivos.

## 🎯 PLAN DE DEBUGGING PASO A PASO

### PASO 1: Verificar PHP Básico
1. Sube todo el contenido de `deployment_final/` a `public_html`
2. Visita: `https://oldstreet.oldstreetcm.com/test_php.php`
3. **Resultado esperado**: JSON con información del servidor
4. **Si falla**: El problema es con PHP en general

### PASO 2: Verificar Directorio Auth
1. Visita: `https://oldstreet.oldstreetcm.com/auth/test_auth.php`
2. **Resultado esperado**: JSON con lista de archivos en el directorio
3. **Si falla**: El problema es con el directorio auth

### PASO 3: Verificar Endpoint Básico
1. Visita: `https://oldstreet.oldstreetcm.com/auth/test_basic.php`
2. **Resultado esperado**: Error 405 (Método no permitido) porque es GET
3. **Si falla**: El problema es con archivos PHP en auth

### PASO 4: Probar Desde Frontend
1. Usa el formulario de recuperación de contraseña
2. **Resultado esperado**: Mensaje "Endpoint básico funciona correctamente"
3. **Si falla**: El problema es con las rutas o CORS

### PASO 5: Verificar Estructura de Archivos
En `public_html` debería haber:
```
public_html/
├── index.html
├── test_php.php
├── .env
├── env_loader.php
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── logo-*.png
├── auth/
│   ├── test_auth.php
│   ├── test_basic.php
│   ├── request_password_reset_simple.php
│   ├── debug_recovery.php
│   ├── auth_system.php
│   ├── login.php
│   ├── register.php
│   ├── logout.php
│   └── reset_password.php
└── images/
    └── ...
```

## 🔍 COMANDOS DE DEBUGGING

### Si PHP funciona pero los archivos no:
```bash
# Verificar permisos (en panel de Hostinger)
chmod 755 auth/
chmod 644 auth/*.php
```

### Si hay problema con rutas:
- Verifica que `.htaccess` esté en la raíz
- Verifica que no haya conflictos con el dominio/subdirectorio

### Si hay problema con CORS:
- Verifica que los headers CORS estén configurados
- Usa herramientas de desarrollador para ver los headers

## 📋 CHECKLIST DE VERIFICACIÓN

- [ ] `test_php.php` funciona (PHP básico)
- [ ] `auth/test_auth.php` funciona (directorio auth)
- [ ] `auth/test_basic.php` funciona (endpoint básico)
- [ ] Frontend puede conectar con `test_basic.php`
- [ ] Base de datos configurada correctamente
- [ ] Archivo `.env` con credenciales correctas
- [ ] PHPMailer instalado (opcional)

## 🚀 PRÓXIMOS PASOS SEGÚN RESULTADO

### Si test_php.php funciona ✅
- El problema es específico del directorio auth
- Revisar permisos y estructura de carpetas

### Si test_auth.php funciona ✅
- El problema es con archivos PHP específicos
- Revisar sintaxis y dependencias

### Si test_basic.php funciona ✅
- El problema es con la lógica de recuperación
- Pasar a debug_recovery.php

### Si todo funciona ✅
- Cambiar endpoint a `request_password_reset_simple.php`
- Luego a `request_password_reset.php`

## 📞 INFORMACIÓN DE CONTACTO
- Archivos de prueba incluidos en deployment_final/
- Logs de error disponibles en panel de Hostinger
- Usar herramientas de desarrollador del navegador para más detalles
