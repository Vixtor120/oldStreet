# 📋 DOCUMENTACIÓN COMPLETA - OLD STREET RP

## 🎯 RESUMEN DEL PROYECTO

**Old Street RP** es un sistema web de whitelist y autenticación para un servidor de Discord de rol. Incluye:

- **Sistema de autenticación** con registro y login
- **Sistema de whitelist** con aprobación/rechazo
- **Sistema de recuperación de contraseñas** vía email
- **Integración con Discord** para asignación automática de roles

---

## 📁 ESTRUCTURA DEL PROYECTO

```
OldStreet_New/
├── src/                    # Código fuente React (Frontend)
├── public/                 # Archivos PHP (Backend)
│   ├── auth/              # Sistema de autenticación
│   │   ├── auth_system.php
│   │   ├── login.php
│   │   ├── register.php
│   │   ├── request_password_reset.php
│   │   └── reset_password.php
│   ├── .env               # Variables de entorno
│   ├── env_loader.php     # Cargador de variables
│   ├── send_whitelist.php # Envío de solicitudes
│   ├── approve_whitelist.php
│   └── reject_whitelist.php
├── deployment_final/       # 🚀 CARPETA DE PRODUCCIÓN (subir a Hostinger)
├── dist/                  # Build del frontend solamente
├── deploy_final.bat       # Script que crea deployment_final
├── database_setup.sql     # Script de base de datos
└── package.json           # Configuración del proyecto
```

---

## 🚀 GUÍA DE DEPLOYMENT

### 1. Preparar el Build

```bash
# Instalar dependencias
npm install

# Crear build de producción
npm run build
```

### 2. Ejecutar Script de Deployment

```bash
# Ejecutar script automático que crea deployment_final/
deploy_final.bat
```

Este script:
- Copia el build de React desde `dist/` a `deployment_final/`
- Copia los archivos PHP necesarios desde `public/`
- Copia configuración (.env, .htaccess)
- Copia documentación y scripts SQL
- **Resultado:** Carpeta `deployment_final/` lista para subir

### 3. Subir a Hostinger

1. **Accede a tu panel de Hostinger**
2. **Ve a "Administrador de archivos"**
3. **Sube TODO el contenido de `deployment_final/`** a la carpeta `public_html/`
4. **Asegúrate de que el archivo `.htaccess` esté en la raíz**

### 4. Configurar Variables de Entorno

Edita el archivo `.env` que ya está en `deployment_final/` con tus datos:

```env
# Discord Bot
DISCORD_BOT_TOKEN=tu_token_aqui
DISCORD_SERVER_ID=tu_server_id
DISCORD_WHITELIST_ROLE_ID=tu_role_id

# Base de Datos
DB_HOST=127.0.0.1
DB_NAME=nombre_bd
DB_USER=usuario_bd
DB_PASS=password_bd

# Email SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_USERNAME=tu_email@dominio.com
SMTP_PASSWORD=tu_password_email
SMTP_FROM_EMAIL=tu_email@dominio.com
SMTP_FROM_NAME=Old Street RP

# Configuración del sitio
SITE_URL=https://tu-dominio.com
JWT_SECRET=clave_secreta_jwt
```

### 5. Configurar Base de Datos

Ejecuta el script SQL que se encuentra en `database_setup.sql` (también incluido en `deployment_final/`):

```sql
-- Crear tablas necesarias
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    discord_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE whitelist_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔧 CONFIGURACIÓN ESPECÍFICA

### Discord Bot

1. **Crear bot en Discord Developer Portal**
2. **Obtener el token del bot**
3. **Invitar el bot a tu servidor con permisos de gestión de roles**
4. **Obtener los IDs necesarios:**
   - Server ID: Click derecho en tu servidor > Copiar ID
   - Role ID: Click derecho en el rol de whitelist > Copiar ID

### Email SMTP (Hostinger)

1. **Crear cuenta de email en panel de Hostinger**
2. **Usar configuración SMTP estándar:**
   - Host: `smtp.hostinger.com`
   - Puerto: `587`
   - Seguridad: `TLS`

---

## 🧪 VERIFICACIÓN POST-DEPLOYMENT

### 1. Verificar rutas básicas:
- `https://tu-dominio.com/` → Debe cargar la página principal
- `https://tu-dominio.com/menu` → Debe cargar el menú
- `https://tu-dominio.com/reset-password` → Debe cargar (no 404)

### 2. Probar funcionalidades:
- **Registro de usuarios** → Debe crear cuenta y asignar rol Discord
- **Login** → Debe funcionar correctamente
- **Recuperación de contraseña** → Debe enviar email y permitir cambio
- **Sistema de whitelist** → Debe enviar solicitudes y permitir aprobación

### 3. Verificar logs:
- Revisar logs de errores en panel de Hostinger
- Verificar que no hay errores 500 o 404

---

## 🔍 SOLUCIÓN DE PROBLEMAS COMUNES

### Error 404 en rutas React
- **Causa:** Archivo `.htaccess` no está funcionando
- **Solución:** Verificar que `.htaccess` esté en la raíz de `public_html`

### Error 500 en endpoints PHP
- **Causa:** Variables de entorno incorrectas o falta de permisos
- **Solución:** Verificar configuración del `.env` y permisos de archivos

### Emails no se envían
- **Causa:** Configuración SMTP incorrecta
- **Solución:** Verificar credenciales de email en panel de Hostinger

### Bot Discord no asigna roles
- **Causa:** Permisos del bot o IDs incorrectos
- **Solución:** Verificar permisos del bot y los IDs del servidor/rol

---

## 📝 CHANGELOG

### v2.0 (Actual)
- ✅ Sistema de recuperación de contraseñas funcionando
- ✅ Tokens de recuperación con expiración de 24 horas
- ✅ Integración completa con Discord
- ✅ Sistema de notificaciones elegantes
- ✅ Rutas React Router funcionando correctamente
- ✅ Documentación simplificada

### v1.0 (Inicial)
- ✅ Sistema básico de autenticación
- ✅ Sistema de whitelist básico
- ✅ Frontend React funcional

---

## 🎯 PRÓXIMOS PASOS

1. **Monitorear logs** para detectar errores en producción
2. **Implementar backups automáticos** de la base de datos
3. **Considerar implementar rate limiting** para evitar spam
4. **Agregar analytics** para monitorear uso del sistema

---

## 📞 SOPORTE

Si encuentras problemas:
1. Revisa los logs del servidor
2. Verifica la configuración del `.env`
3. Comprueba que todos los archivos estén subidos correctamente
4. Verifica permisos de archivos y carpetas

---

*Documentación actualizada: Julio 2025*
