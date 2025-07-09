# Configuración del Archivo .env

## Guía Paso a Paso para Configurar el Sistema

### 1. Crear el archivo .env

1. **Copia el archivo de ejemplo:**
   ```bash
   cp public/.env.example public/.env
   ```

2. **Edita el archivo `.env`** con tus datos reales.

### 2. Configuración de Discord Bot

#### Obtener el Token del Bot:
1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Crea una nueva aplicación
3. Ve a la sección "Bot" y crea un bot
4. Copia el token y pégalo en `DISCORD_BOT_TOKEN`

#### Obtener IDs de Discord:
1. **ID del Servidor:**
   - Activa el "Modo Desarrollador" en Discord
   - Click derecho en tu servidor → "Copiar ID"
   - Pega en `DISCORD_SERVER_ID`

2. **ID del Rol de Whitelist:**
   - Click derecho en el rol → "Copiar ID"
   - Pega en `DISCORD_WHITELIST_ROLE_ID`

### 3. Configuración de Base de Datos

#### Para Desarrollo Local:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=oldstreet_auth
DB_USER=root
DB_PASS=tu_password_local
```

#### Para Hostinger (Producción):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u919896880_oldstreet_auth
DB_USER=u919896880_oldstreetNew
DB_PASS=tu_password_hostinger
```

### 4. Configuración de Seguridad

#### Generar JWT Secret:
```bash
# En Linux/Mac/WSL:
openssl rand -base64 32

# O usa cualquier generador de contraseñas seguras
```

#### Configurar Timeout de Sesión:
- **Desarrollo:** `SESSION_TIMEOUT=86400` (24 horas)
- **Producción:** `SESSION_TIMEOUT=7200` (2 horas)

### 5. Ejemplo de .env Completo

```env
# Discord
DISCORD_BOT_TOKEN=tu_token_real_de_discord_aqui

# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=oldstreet_auth
DB_USER=root
DB_PASS=mi_password_seguro

# Discord IDs
DISCORD_SERVER_ID=1119729040408973333
DISCORD_WHITELIST_ROLE_ID=1262793580481875998

# Seguridad
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz=
SESSION_TIMEOUT=7200
```

### 6. Verificación

Después de configurar el `.env`, puedes verificar que todo funciona:

1. **Verificar conexión a BD:**
   - Ve a `tu-dominio.com/auth/check_session.php`
   - Debería devolver JSON sin errores de conexión

2. **Verificar Discord Bot:**
   - El bot debe estar online en tu servidor
   - Debe tener permisos para gestionar roles

### 7. Seguridad Importante

⚠️ **NUNCA COMPARTAS:**
- El archivo `.env` real
- Los tokens de Discord
- Las credenciales de base de datos

✅ **SÍ PUEDES COMPARTIR:**
- El archivo `.env.example`
- Esta documentación
- Los IDs públicos (servidor, roles)

### 8. Solución de Problemas

#### Error: "Can't connect to database"
- Verifica las credenciales de BD en `.env`
- Asegúrate de que la BD existe y es accesible

#### Error: "Discord bot token invalid"
- Regenera el token en Discord Developer Portal
- Verifica que el bot esté invitado al servidor

#### Error: "Session not persisting"
- Aumenta `SESSION_TIMEOUT`
- Verifica configuración de cookies en producción
