# ENDPOINTS DEL PROYECTO TUS GUSTICOS

**Proyecto:** Sistema de Pedidos de Restaurante  
**Base URL:** `http://localhost:8080/api`  
**Total Endpoints:** 30  
**Métodos HTTP:** GET, POST, PUT, DELETE  

---

## 👥 GESTIÓN DE USUARIOS (7 endpoints)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `POST` | `/api/login` | Iniciar sesión | Body: correoElectronico/telefono, contrasena |
| `POST` | `/api/registro` | Registrar usuario | Body: nombres, apellidos, genero, fechaNacimiento, correoElectronico, telefono, contrasena |
| `GET` | `/api/usuarios` | Listar usuarios (Admin) | - |
| `GET` | `/api/usuarios/{id}` | Usuario por ID | Path: id |
| `PUT` | `/api/usuarios/{id}` | Actualizar usuario | Path: id, Body: datos del usuario |
| `DELETE` | `/api/usuarios/{id}` | Eliminar usuario (Admin) | Path: id |
| `GET` | `/api/test` | Test del servidor | - |

### Ejemplos de Request/Response:

**Login:**
```json
POST /api/login
{
    "correoElectronico": "admin@tusgusticos.com",
    "contrasena": "admin123"
}

Response:
{
    "success": true,
    "message": "Autenticación satisfactoria",
    "data": {
        "idUsuario": 16,
        "nombres": "Administrador",
        "rol": "Administrador"
    }
}
```

---

## 🍽️ GESTIÓN DE PLATOS (6 endpoints)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/platos` | Listar todos los platos | - |
| `GET` | `/api/platos/categoria/{categoria}` | Filtrar por categoría | Path: categoria (corriente/ejecutivo/carta) |
| `GET` | `/api/platos/{id}` | Plato por ID | Path: id |
| `POST` | `/api/platos` | Crear plato (Admin) | Body: nombre, descripcion, precio, imagenUrl, categoria |
| `PUT` | `/api/platos/{id}` | Actualizar plato (Admin) | Path: id, Body: datos del plato |
| `DELETE` | `/api/platos/{id}` | Eliminar plato (Admin) | Path: id |

### Ejemplos:

**Platos por categoría:**
```json
GET /api/platos/categoria/corriente

Response:
[
    {
        "idPlato": 1,
        "nombre": "Arroz con Pollo",
        "descripcion": "Delicioso arroz amarillo...",
        "precio": 12000.00,
        "categoria": {
            "nombre": "corriente"
        }
    }
]
```

---

## 🛒 GESTIÓN DE PEDIDOS (6 endpoints)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `POST` | `/api/pedidos` | Crear pedido | Body: id_usuario, items[] |
| `GET` | `/api/pedidos` | Listar pedidos (Admin) | - |
| `GET` | `/api/pedidos/{id}` | Pedido por ID | Path: id |
| `GET` | `/api/pedidos/usuario/{idUsuario}` | Pedidos de usuario | Path: idUsuario |
| `PUT` | `/api/pedidos/{id}/estado` | Actualizar estado | Path: id, Query: estado |
| `DELETE` | `/api/pedidos/{id}` | Eliminar pedido | Path: id |

### Estados válidos:
- `Pendiente`
- `Cancelado`
- `Enviado`

### Ejemplos:

**Crear pedido:**
```json
POST /api/pedidos
{
    "id_usuario": 16,
    "items": [
        {
            "id_plato": 1,
            "cantidad": 2,
            "precio_unitario": 12000.00
        }
    ]
}

Response:
{
    "success": true,
    "message": "Pedido creado exitosamente",
    "data": {
        "idPedido": 45,
        "estado": "Pendiente",
        "detalles": [...]
    }
}
```

---

## 💳 GESTIÓN DE PAGOS (6 endpoints)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `POST` | `/api/pagos` | Procesar pago | Body: id_pedido, metodo_pago, monto |
| `GET` | `/api/pagos` | Listar pagos (Admin) | - |
| `GET` | `/api/pagos/{id}` | Pago por ID | Path: id |
| `GET` | `/api/pagos/pedido/{idPedido}` | Pagos de pedido | Path: idPedido |
| `PUT` | `/api/pagos/{id}/estado` | Actualizar estado | Path: id, Query: estado |
| `DELETE` | `/api/pagos/{id}` | Eliminar pago | Path: id |

### Métodos de pago válidos:
- `Credito`
- `Debito`
- `Nequi`

### Estados de pago válidos:
- `Confirmado`
- `Rechazado`
- `Pendiente`

### Ejemplos:

**Procesar pago:**
```json
POST /api/pagos
{
    "id_pedido": 45,
    "metodo_pago": "Credito",
    "monto": 24000.00
}

Response:
{
    "success": true,
    "message": "Pago procesado exitosamente",
    "data": {
        "idPago": 23,
        "estadoPago": "Confirmado"
    }
}
```

---

## 📂 GESTIÓN DE CATEGORÍAS (5 endpoints)

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/categorias` | Listar categorías | - |
| `GET` | `/api/categorias/{id}` | Categoría por ID | Path: id |
| `POST` | `/api/categorias` | Crear categoría (Admin) | Body: nombre |
| `PUT` | `/api/categorias/{id}` | Actualizar categoría (Admin) | Path: id, Body: nombre |
| `DELETE` | `/api/categorias/{id}` | Eliminar categoría (Admin) | Path: id |

### Categorías disponibles:
- `corriente`
- `ejecutivo`
- `carta`

---

## 🔧 CÓDIGOS DE RESPUESTA HTTP

| Código | Descripción | Cuándo se usa |
|--------|-------------|---------------|
| `200` | OK | Operación exitosa |
| `201` | Created | Recurso creado exitosamente |
| `400` | Bad Request | Datos inválidos |
| `401` | Unauthorized | Credenciales incorrectas |
| `404` | Not Found | Recurso no encontrado |
| `409` | Conflict | Datos duplicados |
| `500` | Internal Server Error | Error del servidor |

---

## 🔐 PERMISOS POR ROL

### **Cliente:**
- ✅ Login/Registro
- ✅ Ver platos y categorías
- ✅ Crear pedidos
- ✅ Ver sus propios pedidos
- ✅ Procesar pagos
- ✅ Actualizar su perfil

### **Administrador:**
- ✅ Todas las funciones de Cliente
- ✅ Gestionar usuarios (CRUD completo)
- ✅ Gestionar platos (CRUD completo)
- ✅ Gestionar categorías (CRUD completo)
- ✅ Ver todos los pedidos y pagos
- ✅ Eliminar usuarios

---

## 📋 VALIDACIONES IMPLEMENTADAS

### **Usuarios:**
- Email único
- Teléfono único
- Contraseña requerida
- Géneros válidos: MASCULINO, FEMENINO, OTRO

### **Pedidos:**
- Usuario debe existir
- Productos deben existir
- Cantidades mayor a 0
- Precios válidos

### **Pagos:**
- Pedido debe existir
- Monto mayor a 0
- Métodos de pago válidos
- No duplicar pagos confirmados

---

## 🛠️ CONFIGURACIÓN PARA TESTING

### **Postman Environment Variables:**
```json
{
    "BASE_URL": "http://localhost:8080",
    "API_PREFIX": "/api",
    "USER_ID": "16",
    "PEDIDO_ID": "45",
    "PAGO_ID": "23"
}
```

### **Headers requeridos:**
```
Content-Type: application/json
```

### **CORS configurado para:**
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React)

---

## 📊 ESTADÍSTICAS DEL PROYECTO

| Módulo | Endpoints | Funciones |
|--------|-----------|-----------|
| Usuarios | 7 | Login, CRUD, Testing |
| Platos | 6 | CRUD, Filtros |
| Pedidos | 6 | CRUD, Estados, Historial |
| Pagos | 6 | CRUD, Estados, Métodos |
| Categorías | 5 | CRUD básico |
| **TOTAL** | **30** | **API REST Completa** |

---

## 🎯 CASOS DE PRUEBA IMPORTANTES

### **Flujo completo:**
1. Registrar usuario
2. Hacer login
3. Ver platos por categoría
4. Crear pedido con múltiples productos
5. Procesar pago
6. Ver historial de pedidos
7. Cancelar pedido

### **Casos de error:**
- Login con credenciales incorrectas
- Registro con email duplicado
- Crear pedido sin productos
- Pago con monto inválido
- Acceso sin permisos

---

**Fecha de documentación:** Agosto 2025  
**Versión de la API:** 1.0  
**Estado:** Producción ready