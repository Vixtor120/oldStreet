# 🎯 Sistema Semi-Automático de Whitelist - OldStreet

## 🚀 **¿Qué es este sistema?**

Un sistema **súper simple** que permite al staff validar solicitudes de whitelist con **un solo clic desde el email**. No necesitas paneles complicados, solo revisar el email y hacer clic en un botón.

---

## ✅ **¿Cómo funciona?**

### 📝 **1. Usuario envía solicitud**
- Va a `https://oldstreet.oldstreetcm.com`
- Completa el formulario de whitelist
- Hace clic en "Enviar"

### 📧 **2. Staff recibe email automático**
- Email llega a `oldstreetnew@oldstreetcm.com`
- Contiene toda la información del usuario organizada
- **Dos botones grandes**: ✅ **APROBAR** / ❌ **RECHAZAR**

### ⚡ **3. Staff procesa con un clic**
- Lee la información del solicitante
- Hace clic en ✅ Aprobar o ❌ Rechazar
- **¡Eso es todo!**

### 🎮 **4. Discord se actualiza automáticamente**
- **Si aprueba**: `《✅》- <@123456789012345678> - 🌚 ¡Tu whitelist fue 𝐀𝐂𝐄𝐏𝐓𝐀𝐃𝐀 ! 🌚`
- **Si rechaza**: `《🚫》- <@123456789012345678> - 🌚 ¡Tu whitelist fue 𝐑𝐄𝐂𝐇𝐀𝐙𝐀𝐃𝐀 ! 🌚`

---

## 📧 **Ejemplo del email que recibe el staff**

```
🚨 NUEVA SOLICITUD DE WHITELIST
OldStreet Roleplay Community

⚡ ACCIÓN REQUERIDA DEL STAFF ⚡

📅 Recibida: 08/07/2025 15:30:25
🆔 ID: wl_66b2c8f123456

🎯 VALIDAR SOLICITUD:
[✅ APROBAR WHITELIST]  [❌ RECHAZAR WHITELIST]

👤 INFORMACIÓN PERSONAL
• Discord ID: 123456789012345678
• Edad: 25 años
• Cómo encontró el servidor: Por un amigo

🎮 EXPERIENCIA EN ROLEPLAY
• Qué aportarás: Experiencia y buenas historias
• Otros servidores: Servidor anterior durante 2 años
• Por qué elegirte: Responsable y creativo

[... toda la información del formulario ...]

🚀 ACCIÓN FINAL:
[✅ APROBAR WHITELIST]  [❌ RECHAZAR WHITELIST]
```

---

## 🆔 **¿Por qué ID de Discord en lugar de nombre?**

### ✅ **Ventajas del ID de Discord:**
- **Nunca cambia**: Es único y permanente para cada usuario
- **Más confiable**: Siempre identifica al usuario correcto
- **Menciones automáticas**: Discord notifica directamente al usuario
- **Sin duplicados**: No hay confusión con nombres similares

### 📋 **¿Cómo obtener el ID de Discord?**
1. **Activar modo desarrollador**: Configuración → Avanzado → Modo desarrollador (ON)
2. **Obtener ID**: Clic derecho en tu usuario → "Copiar ID de usuario"
3. **Resultado**: Números largos como `123456789012345678`

### 🎮 **Resultado en Discord:**
- **Antes**: `@usuario#1234` (podía fallar si el usuario cambió su nombre)
- **Ahora**: `<@123456789012345678>` (menciona directamente sin importar el nombre actual)

---

## 🛠️ **Configuración del sistema**

### ✅ **Ya configurado:**
- **Email del staff**: `oldstreetnew@oldstreetcm.com`
- **Dominio web**: `https://oldstreet.oldstreetcm.com`
- **Discord webhook**: Conectado y funcionando
- **Seguridad**: Tokens únicos para cada solicitud

### 🔧 **Si necesitas cambiar el webhook de Discord:**
1. Ve a tu servidor de Discord
2. Clic derecho en el canal → "Editar Canal"
3. "Integraciones" → "Webhooks" → "Nuevo Webhook"
4. Copia la URL del webhook
5. Actualiza en `approve_whitelist.php` y `reject_whitelist.php`:
   ```php
   $webhookUrl = "https://discord.com/api/webhooks/TU_NUEVO_WEBHOOK";
   ```

---

## 📁 **Archivos del sistema**

### 🔧 **Archivos principales:**
- **`send_whitelist.php`** → Procesa formulario y envía email al staff
- **`approve_whitelist.php`** → Maneja aprobaciones automáticas
- **`reject_whitelist.php`** → Maneja rechazos automáticos
- **`test_email.php`** → Para probar el envío de emails

### 📄 **Archivo automático:**
- **`whitelist_requests.json`** → Se crea automáticamente para guardar solicitudes

---

## 🎯 **Ventajas del sistema**

### ✅ **Para el Staff:**
- **Un solo clic** para aprobar/rechazar
- **Sin paneles complicados** que recordar
- **Funciona en móvil** desde cualquier lugar
- **Información completa** en un solo email

### ✅ **Para el servidor:**
- **Discord automático** con notificaciones inmediatas
- **Súper seguro** con tokens únicos
- **Fácil de mantener** (solo archivos PHP simples)
- **Historial completo** de todas las solicitudes

### ✅ **Para los usuarios:**
- **Proceso transparente** y claro
- **Respuesta rápida** del staff
- **Notificación automática** en Discord

---

## 🚀 **Instalación y uso**

### 📋 **Para subir a producción:**
1. **Compilar proyecto**: `npm run build`
2. **Subir archivos**: Todo el contenido de `dist/` a `public_html/`
3. **Verificar email**: Que `oldstreetnew@oldstreetcm.com` esté configurado
4. **Probar sistema**: Acceder a `tu-dominio.com/test_email.php`

### 🧪 **Para probar:**
- **Formulario**: `https://oldstreet.oldstreetcm.com`
- **Test email**: `https://oldstreet.oldstreetcm.com/test_email.php`

---

## 🆘 **Solución de problemas**

### 📧 **Si no llegan emails:**
- Verificar que `oldstreetnew@oldstreetcm.com` esté configurado en Hostinger
- Revisar carpeta de spam
- Probar con `test_email.php`

### 🎮 **Si no aparecen mensajes en Discord:**
- Verificar que el webhook esté correcto
- El canal debe permitir webhooks
- Revisar que el bot tenga permisos

### 🌐 **Si los botones no funcionan:**
- Verificar que los archivos PHP estén subidos
- Comprobar permisos de escritura en el servidor
- Revisar logs de errores del servidor

---

## 💡 **Resumen rápido**

**🎯 El sistema es súper simple:**
1. Usuario llena formulario → 2. Staff recibe email → 3. Staff hace clic → 4. Discord se actualiza

**📧 Staff solo necesita:**
- Leer el email que llega
- Hacer clic en ✅ o ❌
- **¡Todo lo demás es automático!**

**🚀 ¡Sistema listo para usar!**
