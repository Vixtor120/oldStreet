# 🧪 PLAN DE PRUEBAS PASO A PASO - SISTEMA DE RECUPERACIÓN

## 🎯 OBJETIVO
Probar el sistema de recuperación de contraseñas de forma incremental hasta que funcione completamente con envío de email.

## 📋 ENDPOINTS DISPONIBLES PARA PRUEBAS

### 1. `test_basic.php` ✅ (YA FUNCIONA)
- **Propósito**: Verificar comunicación frontend-backend básica
- **Respuesta**: JSON simple sin base de datos
- **Estado**: ✅ FUNCIONANDO

### 2. `test_with_db.php` ⏳ (SIGUIENTE A PROBAR)
- **Propósito**: Verificar conexión a base de datos y generación de tokens
- **Incluye**: Base de datos, usuarios, tokens
- **No incluye**: Envío de email

### 3. `test_with_email.php` ⏳ (FINAL)
- **Propósito**: Sistema completo con envío de email
- **Incluye**: Todo lo anterior + PHPMailer
- **Resultado**: Sistema completo funcionando

## 🔄 PROCESO DE PRUEBAS

### PASO 1: Subir Archivos
1. Sube TODO el contenido de `deployment_final/` a `public_html`
2. Verifica que estos archivos estén presentes:
   - `test_basic.php` (ya funciona)
   - `test_with_db.php` (nuevo)
   - `test_with_email.php` (nuevo)
   - `auth/auth_system.php` (actualizado)

### PASO 2: Probar Base de Datos
1. **Usa la función "Olvidé mi contraseña"**
2. **Ingresa el email**: `victorhidalgosanjurjo.1@gmail.com`
3. **Resultado esperado**:
   ```json
   {
     "success": true,
     "message": "Token de recuperación generado exitosamente",
     "debug": {
       "user_found": true,
       "token_generated": true,
       "token_saved": true,
       "reset_link": "https://oldstreet.oldstreetcm.com/reset-password?token=abc123...",
       "user_id": 1,
       "username": "nombre_usuario"
     }
   }
   ```

### PASO 3: Verificar Token en Base de Datos
Si el paso 2 funciona, verifica en tu base de datos:
```sql
SELECT * FROM password_reset_tokens ORDER BY created_at DESC LIMIT 1;
```

### PASO 4: Actualizar a Endpoint con Email
Si el paso 2 funciona, actualiza el frontend:

**Cambio en el código:**
```tsx
// Cambiar de:
const response = await fetch('/auth/test_with_db.php', {

// A:
const response = await fetch('/auth/test_with_email.php', {
```

### PASO 5: Probar con Email
1. **Usa la función "Olvidé mi contraseña"**
2. **Resultado esperado si PHPMailer funciona**:
   ```json
   {
     "success": true,
     "message": "Se ha enviado un enlace de recuperación a tu email"
   }
   ```

3. **Resultado esperado si PHPMailer falla**:
   ```json
   {
     "success": true,
     "message": "Token generado, pero no se pudo enviar el email. Por favor contacta al administrador.",
     "debug": {
       "email_error": "descripción del error",
       "reset_link": "enlace directo para usar"
     }
   }
   ```

## 🐛 DEBUGGING

### Si test_with_db.php falla:
- Verifica que `database_setup.sql` se haya ejecutado
- Verifica las credenciales de base de datos en `.env`
- Revisa los logs de error del servidor

### Si test_with_email.php falla:
- Verifica que PHPMailer esté instalado (`vendor/` folder)
- Verifica las credenciales SMTP en `.env`
- Usa el `reset_link` del debug para acceder manualmente

## 📊 ESTADOS DE PRUEBA

- [x] **test_basic.php** - Comunicación básica ✅
- [ ] **test_with_db.php** - Base de datos y tokens ⏳
- [ ] **test_with_email.php** - Sistema completo con email ⏳
- [ ] **Migración a endpoint final** - Usar `request_password_reset.php` ⏳

## 🎯 PRÓXIMOS PASOS

1. **Prueba `test_with_db.php`** y comparte el resultado
2. **Si funciona**: Proceder con `test_with_email.php`
3. **Si falla**: Debuggear la base de datos
4. **Una vez funcionando**: Migrar al endpoint final

## 📝 NOTAS IMPORTANTES

- Cada endpoint da información de debug detallada
- Los tokens se guardan en la base de datos independientemente del email
- El sistema es seguro (no revela si el email existe)
- Los enlaces de recuperación expiran en 24 horas

---

**El frontend actual está configurado para usar `test_with_db.php`**
**Sube los archivos y prueba el siguiente paso del proceso**
