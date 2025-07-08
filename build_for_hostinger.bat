@echo off
echo 🚀 Compilando OldStreet para Hostinger...
echo.

echo 📦 Instalando dependencias...
call npm install

echo.
echo 🔨 Compilando proyecto React...
call npm run build

echo.
echo 📋 Copiando archivos PHP y configuración...
if not exist "dist" mkdir dist
copy "public\send_whitelist.php" "dist\send_whitelist.php"
copy "public\.htaccess" "dist\.htaccess"

echo.
echo ✅ ¡Compilación completada!
echo.
echo 📁 Archivos listos en la carpeta 'dist\'
echo 🌐 Sube todo el contenido de 'dist\' a tu directorio public_html en Hostinger
echo.
echo 📧 No olvides verificar que el correo oldstreetnew@oldstreetcm.com esté configurado
echo.
pause
