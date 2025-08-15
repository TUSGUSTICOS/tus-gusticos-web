# Tus Gusticos - Sistema de Pedidos de Restaurante

Sistema web completo para gestión de pedidos de restaurante desarrollado con **React** (Frontend) y **Spring Boot** (Backend) con base de datos **MySQL**.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Prerrequisitos](#prerrequisitos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Configuración de Base de Datos](#configuración-de-base-de-datos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [API Endpoints](#api-endpoints)
- [Usuarios de Prueba](#usuarios-de-prueba)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Solución de Problemas](#solución-de-problemas)

## 📖 Descripción

**Tus Gusticos** es un sistema web que permite a los usuarios realizar pedidos de comida en línea. El sistema cuenta con diferentes tipos de menús (corriente, ejecutivo, carta), gestión de usuarios, carrito de compras, procesamiento de pagos y panel administrativo.

### Características Principales:
- ✅ Registro e inicio de sesión de usuarios
- ✅ Navegación por categorías de platos
- ✅ Carrito de compras funcional
- ✅ Sistema de pagos (Tarjeta de Crédito/Débito, Nequi)
- ✅ Historial de pedidos y cancelaciones
- ✅ Panel de administración para gestión de usuarios
- ✅ Responsive design

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 18.x
- **React Router DOM** para navegación
- **CSS3** para estilos
- **Axios** para peticiones HTTP
- **JavaScript ES6+**

### Backend
- **Spring Boot** 3.x
- **Spring Data JPA** para ORM
- **MySQL** 8.x como base de datos
- **Maven** para gestión de dependencias
- **Java** 17+

### Base de Datos
- **MySQL** 8.x
- **Estructura relacional** con tablas: usuarios, categorias, platos, pedidos, detalle_pedido, pagos

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

### Software Requerido:
1. **Java JDK 17 o superior**
   - Descargar desde: https://www.oracle.com/java/technologies/downloads/
   
2. **Node.js 16 o superior**
   - Descargar desde: https://nodejs.org/
   
3. **MySQL 8.0 o superior**
   - Descargar desde: https://dev.mysql.com/downloads/mysql/
   
4. **IDE recomendado:**
   - IntelliJ IDEA (para backend)
   - Visual Studio Code (para frontend)

### Verificar Instalaciones:
```bash
java -version
node -v
npm -v
mysql --version
```

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/tus-gusticos.git
cd tus-gusticos
```

### 2. Configurar Frontend
```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
npm install

# Verificar que se instalaron correctamente
npm list react react-dom react-router-dom axios
```

### 3. Configurar Backend
```bash
# Navegar a la carpeta del backend
cd backend

# Compilar el proyecto (si usas Maven desde línea de comandos)
./mvnw clean install
```

## 🗄️ Configuración de Base de Datos

### 1. Crear Base de Datos
Ejecuta los siguientes comandos en MySQL:

```sql
-- Crear la base de datos
CREATE DATABASE data_base_tus_gusticos;

-- Usar la base de datos
USE data_base_tus_gusticos;

-- Crear usuario (opcional)
CREATE USER 'tus_gusticos_user'@'localhost' IDENTIFIED BY 'tu_password';
GRANT ALL PRIVILEGES ON data_base_tus_gusticos.* TO 'tus_gusticos_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Importar Datos Iniciales
El archivo `data_base_tus_gusticos.sql` contiene:
- Estructura de las tablas
- Datos de categorías
- Platos de ejemplo
- Usuario administrador

```bash
# Importar el archivo SQL
mysql -u root -p data_base_tus_gusticos < data_base_tus_gusticos.sql
```

### 3. Configurar Conexión en Backend
Edita el archivo `src/main/resources/application.properties`:

```properties
# Configuración de la base de datos MySQL
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/data_base_tus_gusticos?useSSL=false&serverTimezone=America/Bogota&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD_AQUI
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true

# Puerto del servidor
server.port=8080
```

## ▶️ Ejecución del Proyecto

### 1. Iniciar Backend (Puerto 8080)
```bash
# Opción 1: Desde IntelliJ IDEA
# Abrir el proyecto en IntelliJ
# Ejecutar la clase TusGusticosIntellijApplication.java

# Opción 2: Desde línea de comandos
cd backend
./mvnw spring-boot:run

# Opción 3: Ejecutar JAR compilado
java -jar target/tus-gusticos-0.0.1-SNAPSHOT.jar
```

### 2. Iniciar Frontend (Puerto 5173)
```bash
# En otra terminal
cd frontend
npm run dev
```

### 3. Verificar que todo funcione
- **Backend:** http://localhost:8080/api/test
- **Frontend:** http://localhost:5173
- **API Swagger** (si está configurado): http://localhost:8080/swagger-ui.html

## 📁 Estructura del Proyecto

```
tus-gusticos/
├── backend/
│   ├── src/main/java/com/tusgusticos/tus_gusticos_intellij/
│   │   ├── controller/          # Controladores REST
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── model/               # Entidades JPA
│   │   ├── repository/          # Repositorios JPA
│   │   ├── service/             # Lógica de negocio
│   │   └── config/              # Configuración
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas principales
│   │   ├── services/            # Servicios para API
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── data_base_tus_gusticos.sql   # Script de base de datos
└── README.md
```

## ⚙️ Funcionalidades

### 👤 Gestión de Usuarios
- **Registro** de nuevos usuarios
- **Login** con email o teléfono
- **Actualización** de datos personales
- **Roles:** Cliente y Administrador

### 🍽️ Gestión de Menús
- **Categorías:** Corriente, Ejecutivo, Carta
- **Visualización** de platos con descripción y precio
- **Imágenes** de platos
- **Filtrado** por categoría

### 🛒 Carrito de Compras
- **Agregar/quitar** productos
- **Modificar cantidades**
- **Cálculo automático** de totales
- **Persistencia** en localStorage

### 💳 Sistema de Pagos
- **Métodos:** Tarjeta de Crédito, Débito, Nequi
- **Validación** de formularios
- **Confirmación** de pagos
- **Registro** en base de datos

### 📋 Historial y Gestión
- **Historial de pedidos** por usuario
- **Cancelación** de pedidos pendientes
- **Estados:** Pendiente, Cancelado, Enviado
- **Panel administrativo** para gestión de usuarios

## 🔌 API Endpoints

### Autenticación
```
POST /api/login          # Iniciar sesión
POST /api/registro       # Registrar usuario
```

### Usuarios
```
GET    /api/usuarios           # Listar usuarios (Admin)
GET    /api/usuarios/{id}      # Obtener usuario por ID
PUT    /api/usuarios/{id}      # Actualizar usuario
DELETE /api/usuarios/{id}      # Eliminar usuario (Admin)
```

### Platos
```
GET /api/platos                    # Listar todos los platos
GET /api/platos/categoria/{cat}    # Platos por categoría
GET /api/platos/{id}               # Obtener plato por ID
```

### Pedidos
```
POST /api/pedidos                    # Crear pedido
GET  /api/pedidos/usuario/{id}       # Pedidos por usuario
PUT  /api/pedidos/{id}/estado        # Actualizar estado
```

### Pagos
```
POST /api/pagos                      # Procesar pago
GET  /api/pagos/pedido/{id}          # Pagos por pedido
PUT  /api/pagos/{id}/estado          # Actualizar estado pago
```

## 👥 Usuarios de Prueba

El sistema incluye usuarios preconfigurados:

### Administrador
- **Email:** admin@tusgusticos.com
- **Contraseña:** admin123
- **Permisos:** Gestión completa del sistema

### Usuario Cliente
- **Email:** maria.garcia@email.com
- **Contraseña:** 123456
- **Permisos:** Realizar pedidos

### Crear Nuevo Usuario
Puedes registrar nuevos usuarios desde la página de registro.

## 📱 Capturas de Pantalla

### Página Principal (Login)
![Login](docs/screenshots/login.png)

### Menú de Platos
![Menu](docs/screenshots/menu.png)

### Carrito de Compras
![Carrito](docs/screenshots/carrito.png)

### Panel de Administración
![Admin](docs/screenshots/admin.png)

## 🔧 Solución de Problemas

### Problema: Error de conexión a la base de datos
**Solución:**
```bash
# Verificar que MySQL esté ejecutándose
sudo service mysql status

# Verificar credenciales en application.properties
# Verificar que la base de datos existe
mysql -u root -p -e "SHOW DATABASES;"
```

### Problema: Puerto 8080 ya en uso
**Solución:**
```bash
# Encontrar proceso en puerto 8080
lsof -i :8080

# Terminar proceso
kill -9 PID_DEL_PROCESO

# O cambiar puerto en application.properties
server.port=8081
```

### Problema: Dependencias de Node.js
**Solución:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: CORS en desarrollo
**Solución:**
El backend ya incluye configuración CORS para desarrollo:
```java
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
```

### Problema: Error 404 en rutas de React
**Solución:**
Asegúrate de que el servidor de desarrollo esté ejecutándose y que uses `npm run dev` en lugar de `npm start`.

## 📞 Soporte

Si encuentras algún problema durante la instalación o ejecución:

1. **Verifica los logs** del backend en la consola
2. **Revisa la consola** del navegador para errores de frontend
3. **Confirma** que todos los servicios estén ejecutándose
4. **Valida** la configuración de base de datos

## 📝 Notas Adicionales

- El sistema está optimizado para desarrollo local
- Para producción, actualizar las URLs y configuraciones de seguridad
- Las imágenes de platos son URLs externas (Unsplash)
- El sistema no incluye autenticación JWT (simplificado para desarrollo)

## 🎯 Funcionalidades Futuras

- [ ] Autenticación con JWT
- [ ] Notificaciones en tiempo real
- [ ] Sistema de calificaciones
- [ ] Integración con pasarelas de pago reales
- [ ] Dashboard de analytics para administradores
- [ ] App móvil con React Native

---

**Desarrollado por:** Johan Smith Mesa Rodriguez
**Institución:** SENA  
**Año:** 2025