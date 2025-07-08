# OldStreet Whitelist System

## Sistema de Whitelist con Integración de Discord

Este sistema permite gestionar solicitudes de whitelist para el servidor de OldStreet, con integración automática de roles en Discord.

## Configuración del Bot de Discord

Para que la asignación automática de roles funcione correctamente, necesitas seguir estos pasos:

1. **Crear un Bot en Discord**:
   - Ve a [Discord Developer Portal](https://discord.com/developers/applications)
   - Crea una nueva aplicación
   - En la sección "Bot", haz clic en "Add Bot"
   - Copia el token del bot (será usado en el archivo .env)

2. **Configurar Permisos**:
   - En la sección "OAuth2" > "URL Generator"
   - Selecciona los scopes: `bot` y `applications.commands`
   - En permisos del bot, selecciona: `Manage Roles`
   - Utiliza la URL generada para invitar al bot a tu servidor

3. **Asignar Token en el Sistema**:
   - Edita el archivo `.env` en la carpeta `public`
   - Reemplaza `tu_token_aqui` con el token de tu bot
   ```
   DISCORD_BOT_TOKEN=tu_token_real_aqui
   ```

4. **Importante**: Asegúrate de que el rol del bot esté por encima del rol que intentará asignar en la jerarquía de roles de Discord.

## Funcionamiento

Cuando una solicitud de whitelist es aprobada:
1. Se envía una notificación al usuario a través del webhook de Discord
2. El bot asigna automáticamente el rol "『⚜️』𝔚𝔥𝔦𝔱𝔢𝔩𝔦𝔰𝔱-ℜ𝔓" al usuario

## Solución de Problemas

Si la asignación de roles no funciona:

1. Verifica que el token del bot sea válido
2. Comprueba que el bot tenga permisos para gestionar roles
3. Asegúrate de que el rol del bot esté por encima del rol que intenta asignar
4. Revisa los logs de error en el servidor para más detalles

## Datos Técnicos

- ID del Servidor: 1119729040408973333
- ID del Rol Whitelist: 1262793580481875998
