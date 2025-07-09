# 🔧 Debug del Error 500 en Recuperación de Contraseña

## Error Actual:
```
POST https://oldstreet.oldstreetcm.com/auth/request_password_reset.php 500 (Internal Server Error)
SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

## 🚀 Pasos para Debuggear:

### 1. Subir Archivos Actualizados
Sube estos archivos nuevos a Hostinger:
- `dist/` completo (nueva build)
- `public/auth/request_password_reset_debug.php`

### 2. Probar el Endpoint de Debug
1. **Ve a tu sitio web**
2. **Abre el modal de "¿Olvidaste tu contraseña?"**
3. **Ingresa tu email y envía**
4. **Abre las herramientas de desarrollador (F12)**
5. **Ve a la pestaña "Network" o "Red"**
6. **Busca la petición a `request_password_reset_debug.php`**

### 3. Revisar Respuesta del Servidor
En la consola verás información detallada como:
```json
{
  "success": true/false,
  "message": "...",
  "debug": {
    "method": "POST",
    "post_data": {...},
    "files_exist": {...},
    "env_check": {...}
  }
}
```

### 4. Posibles Problemas y Soluciones:

#### Problema 1: Archivos no encontrados
**Si ves:** `"files_exist": {"env_loader": false, "auth_system": false}`
**Solución:** 
- Verifica que `env_loader.php` esté en la raíz de public_html
- Verifica que `auth_system.php` esté en public_html/auth/

#### Problema 2: Variables de entorno
**Si ves:** `"env_check": {"DB_HOST": "NO_SET", ...}`
**Solución:**
- Verifica que el archivo `.env` esté en la raíz
- Verifica que `env_loader.php` funcione correctamente

#### Problema 3: Error de base de datos
**Si ves error de conexión a BD:**
**Solución:**
- Verifica credenciales en `.env`
- Asegúrate de que la tabla `password_reset_tokens` exista

#### Problema 4: Error de PHP
**Si ves error de sintaxis o fatal:**
**Solución:**
- Revisa los logs de error en cPanel
- Verifica que PHP 7.4+ esté activo

### 5. Acceso Directo para Más Debug

También puedes acceder directamente a:
```
https://oldstreet.oldstreetcm.com/auth/request_password_reset_debug.php
```

Y verás un error detallado si hay problemas de configuración.

### 6. Revisar Logs de Error

En tu panel de Hostinger:
1. **cPanel > Archivos de Error**
2. **Busca errores recientes**
3. **Filtra por la fecha/hora de la prueba**

### 7. Test de Componentes Individuales

#### Test 1: Verificar env_loader.php
```
https://oldstreet.oldstreetcm.com/debug_email.php?debug=email_test
```

#### Test 2: Verificar auth_system.php
```
https://oldstreet.oldstreetcm.com/auth/check_session.php
```

#### Test 3: Verificar base de datos
```
https://oldstreet.oldstreetcm.com/auth/debug_session.php
```

## 📋 Información a Reportar:

Cuando pruebes, anota:

1. **Respuesta del debug endpoint:**
   - ¿Success true o false?
   - ¿Qué dice el mensaje?
   - ¿Qué muestra la sección debug?

2. **Errores en logs:**
   - ¿Aparecen errores en cPanel > Archivos de Error?
   - ¿Qué fecha/hora?

3. **Estado de archivos:**
   - ¿Existen todos los archivos mencionados?
   - ¿Están en las rutas correctas?

## 🔄 Una vez encontrado el problema:

1. **Arreglar el problema principal**
2. **Cambiar de vuelta a:** `request_password_reset.php`
3. **Eliminar el archivo debug**
4. **Rebuild y subir versión final**

El endpoint de debug te dará toda la información necesaria para identificar exactamente qué está fallando.
