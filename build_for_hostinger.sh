#!/bin/bash

echo "🚀 Compilando OldStreet para Hostinger..."
echo

echo "📦 Instalando dependencias..."
npm install

echo
echo "🔨 Compilando proyecto React..."
npm run build

echo
echo "📋 Copiando archivos PHP y configuración..."
cp public/send_whitelist.php dist/send_whitelist.php
cp public/.htaccess dist/.htaccess

echo
echo "✅ ¡Compilación completada!"
echo
echo "📁 Archivos listos en la carpeta 'dist/'"
echo "🌐 Sube todo el contenido de 'dist/' a tu directorio public_html en Hostinger"
echo
echo "📧 No olvides verificar que el correo oldstreetnew@oldstreetcm.com esté configurado"
echo
