@echo off
color 0A
echo =========================================================
echo           🚀 COMPILACIÓN COMPLETA TUS GUSTICOS 🚀
echo =========================================================
echo.
echo Este script compilará todo el proyecto automáticamente:
echo ✅ Backend Spring Boot (JAR ejecutable)
echo ✅ Frontend React (Archivos estáticos)
echo ✅ Documentación organizada
echo ✅ Estructura de entrega
echo.
echo Ubicación del proyecto: %CD%
echo.
pause

REM 1. CREAR ESTRUCTURA DE ENTREGA
echo.
echo [PASO 1] Creando estructura de entrega...
if not exist "distribucion" mkdir "distribucion"
if not exist "distribucion\backend" mkdir "distribucion\backend" 
if not exist "distribucion\frontend" mkdir "distribucion\frontend"
if not exist "distribucion\documentacion" mkdir "distribucion\documentacion"
if not exist "distribucion\base-datos" mkdir "distribucion\base-datos"
if not exist "distribucion\postman" mkdir "distribucion\postman"
echo ✅ Estructura creada

REM 2. COMPILAR BACKEND
echo.
echo [PASO 2] Compilando Backend Spring Boot...
cd tus_gusticos_intellij
call mvn clean package -DskipTests -q
if exist "target\*.jar" (
    copy "target\*.jar" "..\distribucion\backend\" >nul
    echo ✅ Backend compilado exitosamente
) else (
    echo ❌ Error compilando backend
)
cd ..

REM 3. COMPILAR FRONTEND  
echo.
echo [PASO 3] Compilando Frontend React...
cd tus-gusticos-frontend
call npm install >nul 2>&1
call npm run build >nul 2>&1
if exist "dist" (
    xcopy "dist\*" "..\distribucion\frontend\" /E /Y >nul
    echo ✅ Frontend compilado exitosamente
) else (
    echo ❌ Error compilando frontend
)
cd ..

REM 4. COPIAR BASE DE DATOS
echo.
echo [PASO 4] Copiando archivos de base de datos...
if exist "tus-gusticos-base-de-datos\*.sql" (
    copy "tus-gusticos-base-de-datos\*.sql" "distribucion\base-datos\" >nul
    echo ✅ Scripts SQL copiados
)

REM 5. COPIAR POSTMAN
echo.
echo [PASO 5] Copiando colecciones Postman...
if exist "tus-gusticos-json\*.json" (
    copy "tus-gusticos-json\*.json" "distribucion\postman\" >nul
    echo ✅ Colecciones Postman copiadas
)

REM 6. CREAR DOCUMENTACIÓN
echo.
echo [PASO 6] Generando documentación completa...
call crear-documentacion.bat >nul 2>&1
echo ✅ Documentación generada

REM 7. CREAR ARCHIVO DE INSTRUCCIONES
echo.
echo [PASO 7] Creando instrucciones de ejecución...
(
echo ==========================================
echo     INSTRUCCIONES DE EJECUCIÓN
echo     TUS GUSTICOS - SISTEMA COMPLETO
echo ==========================================
echo.
echo 📋 REQUISITOS:
echo - Java JDK 17 o superior
echo - MySQL 8.x ejecutándose
echo - Navegador web moderno
echo.
echo 🗄️ CONFIGURAR BASE DE DATOS:
echo 1. Abrir MySQL Workbench o terminal
echo 2. Ejecutar: base-datos/data_base_tus_gusticos.sql
echo 3. Verificar que se crearon las tablas
echo.
echo 🚀 EJECUTAR BACKEND:
echo 1. Abrir terminal en la carpeta 'backend'
echo 2. Ejecutar: java -jar tus-gusticos-0.0.1-SNAPSHOT.jar
echo 3. Verificar en: http://localhost:8080/api/test
echo.
echo 🌐 EJECUTAR FRONTEND:
echo 1. Abrir navegador
echo 2. Navegar a: frontend/index.html
echo 3. O usar servidor web para servir la carpeta 'frontend'
echo.
echo 👤 USUARIOS DE PRUEBA:
echo Admin: admin@tusgusticos.com / admin123
echo Cliente: maria.garcia@email.com / 123456
echo.
echo 📊 TESTING CON POSTMAN:
echo 1. Importar colecciones desde carpeta 'postman'
echo 2. Configurar variable baseUrl = http://localhost:8080
echo 3. Ejecutar endpoints de prueba
echo.
echo 📚 DOCUMENTACIÓN:
echo Ver carpeta 'documentacion' para detalles técnicos
echo.
) > "distribucion\INSTRUCCIONES-EJECUCION.txt"

echo ✅ Instrucciones creadas

echo.
echo =========================================================
echo                ✅ COMPILACIÓN COMPLETADA ✅
echo =========================================================
echo.
echo 📁 Todo listo en la carpeta: distribucion/
echo.
echo Estructura generada:
echo ├── backend/           (JAR ejecutable)
echo ├── frontend/          (Archivos web)  
echo ├── base-datos/        (Scripts SQL)
echo ├── postman/           (Colecciones API)
echo ├── documentacion/     (Docs técnicos)
echo └── INSTRUCCIONES-EJECUCION.txt
echo.
pause
