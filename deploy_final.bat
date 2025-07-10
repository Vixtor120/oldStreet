@echo off
echo ======================================
echo   DEPLOYMENT FINAL - OLD STREET RP   
echo ======================================
echo.
echo Preparando archivos para subir a Hostinger...
echo.

REM Crear carpeta de deployment
if not exist "deployment_final" mkdir deployment_final

REM Limpiar deployment anterior
if exist "deployment_final\*" del /Q deployment_final\*.*
if exist "deployment_final\assets" rmdir /S /Q deployment_final\assets
if exist "deployment_final\auth" rmdir /S /Q deployment_final\auth

echo ✅ Copiando frontend (dist)...
xcopy /E /Y dist\* deployment_final\

echo ✅ Copiando archivos PHP esenciales...
if not exist "deployment_final\auth" mkdir deployment_final\auth
xcopy /Y public\auth\auth_system.php deployment_final\auth\
xcopy /Y public\auth\login.php deployment_final\auth\
xcopy /Y public\auth\register.php deployment_final\auth\
xcopy /Y public\auth\logout.php deployment_final\auth\
xcopy /Y public\auth\request_password_reset.php deployment_final\auth\
xcopy /Y public\auth\reset_password.php deployment_final\auth\

echo ✅ Copiando archivos de configuración...
xcopy /Y public\.env deployment_final\
xcopy /Y public\env_loader.php deployment_final\

echo ✅ Copiando archivos de whitelist...
xcopy /Y public\send_whitelist.php deployment_final\
xcopy /Y public\approve_whitelist.php deployment_final\
xcopy /Y public\reject_whitelist.php deployment_final\

echo ✅ Copiando archivos de configuración web...
xcopy /Y deployment_final\.htaccess deployment_final\ 2>nul

echo ✅ Copiando documentación...
xcopy /Y DOCUMENTACION_COMPLETA.md deployment_final\
xcopy /Y database_setup.sql deployment_final\
xcopy /Y public\auth\reset_password.php deployment_final\auth\
xcopy /Y public\.env deployment_final\
xcopy /Y public\env_loader.php deployment_final\

echo.
echo ======================================
echo ARCHIVOS LISTOS PARA SUBIR:
echo.
echo 1. Sube TODO el contenido de 'deployment_final\' a public_html en Hostinger
echo 2. Asegurate de que PHPMailer este instalado (vendor/)
echo 3. Prueba el sistema
echo.
echo IMPORTANTE: 
echo - El endpoint funcional es: request_password_reset_working.php
echo - Funciona con o sin PHPMailer
echo ======================================
echo.
pause

echo.
echo ======================================
echo   DEPLOYMENT COMPLETADO EXITOSAMENTE   
echo ======================================
echo.
echo 📁 Archivos preparados en: deployment_final\
echo.
echo 🚀 PRÓXIMOS PASOS:
echo.
echo 1. Accede a tu panel de Hostinger
echo 2. Ve a "Administrador de archivos"
echo 3. Sube TODO el contenido de deployment_final\ a public_html\
echo 4. Asegurate de que .htaccess este en la raiz
echo 5. Configura las variables en .env
echo 6. Ejecuta database_setup.sql en tu base de datos
echo.
echo ✅ Para mas detalles revisa: DOCUMENTACION_COMPLETA.md
echo.
pause
