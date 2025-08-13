-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tus_gusticos_diagrama;
USE tus_gusticos_diagrama;

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'administrador') NOT NULL DEFAULT 'cliente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
);

-- Tabla Perfil
CREATE TABLE Perfil (
    id_perfil INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    ciudad VARCHAR(50),
    fecha_nacimiento DATE,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_perfil),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    UNIQUE (id_usuario)
);

-- Tabla Menu
CREATE TABLE Menu (
    id_menu INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_menu)
);

-- Tabla Categoria
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT,
    id_menu INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    orden INT DEFAULT 0,
    PRIMARY KEY (id_categoria),
    FOREIGN KEY (id_menu) REFERENCES Menu(id_menu) ON DELETE CASCADE
);

-- Tabla Plato
CREATE TABLE Plato (
    id_plato INT AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_plato),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE
);

-- Tabla EstadoPedido
CREATE TABLE EstadoPedido (
    id_estado INT AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    PRIMARY KEY (id_estado)
);

-- Tabla Pedido
CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_estado INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    notas TEXT,
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT,
    FOREIGN KEY (id_estado) REFERENCES EstadoPedido(id_estado) ON DELETE RESTRICT
);

-- Tabla DetallePedido
CREATE TABLE DetallePedido (
    id_detalle INT AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_plato INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notas TEXT,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_plato) REFERENCES Plato(id_plato) ON DELETE RESTRICT
);

-- Tabla Carrito
CREATE TABLE Carrito (
    id_carrito INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_carrito),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    UNIQUE (id_usuario)
);

-- Tabla DetalleCarrito
CREATE TABLE DetalleCarrito (
    id_detalle_carrito INT AUTO_INCREMENT,
    id_carrito INT NOT NULL,
    id_plato INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_detalle_carrito),
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito) ON DELETE CASCADE,
    FOREIGN KEY (id_plato) REFERENCES Plato(id_plato) ON DELETE CASCADE
);

-- Insertar estados de pedido básicos
INSERT INTO EstadoPedido (nombre, descripcion) VALUES
('Pendiente', 'Pedido recién creado'),
('En Preparación', 'El pedido está siendo preparado en cocina'),
('Listo para Entrega', 'El pedido está listo para ser entregado'),
('Entregado', 'El pedido ha sido entregado exitosamente'),
('Cancelado', 'El pedido ha sido cancelado');

-- Crear índices para optimizar las búsquedas
CREATE INDEX idx_usuario_correo ON Usuario(correo);
CREATE INDEX idx_plato_categoria ON Plato(id_categoria);
CREATE INDEX idx_pedido_usuario ON Pedido(id_usuario);
CREATE INDEX idx_pedido_estado ON Pedido(id_estado);
CREATE INDEX idx_detalle_pedido_plato ON DetallePedido(id_plato);
CREATE INDEX idx_detalle_carrito_plato ON DetalleCarrito(id_plato);
