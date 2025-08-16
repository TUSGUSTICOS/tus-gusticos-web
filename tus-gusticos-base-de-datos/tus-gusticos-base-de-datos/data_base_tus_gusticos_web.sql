-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: nozomi.proxy.rlwy.net    Database: data_base_tus_gusticos_web
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id_carrito` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_carrito`),
  KEY `fk_carrito_usuario` (`id_usuario`),
  CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` enum('corriente','ejecutivo','carta') NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'corriente'),(2,'ejecutivo'),(3,'carta');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_pedido` bigint NOT NULL,
  `id_plato` int NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `FKh10qteor08f4cbxhsf97qtgyk` (`id_pedido`),
  KEY `FKdblhnstsowbr758vf3e6y0f83` (`id_plato`),
  CONSTRAINT `FKdblhnstsowbr758vf3e6y0f83` FOREIGN KEY (`id_plato`) REFERENCES `platos` (`id_plato`),
  CONSTRAINT `FKh10qteor08f4cbxhsf97qtgyk` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pago` bigint NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint NOT NULL,
  `metodo_pago` enum('Credito','Debito','Nequi') NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_pago` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_pago` enum('Confirmado','Rechazado','Pendiente') DEFAULT 'Pendiente',
  PRIMARY KEY (`id_pago`),
  KEY `id_pedido` (`id_pedido`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `fecha_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('Pendiente','Cancelado','Enviado') DEFAULT 'Pendiente',
  PRIMARY KEY (`id_pedido`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platos`
--

DROP TABLE IF EXISTS `platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platos` (
  `id_plato` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_plato`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `platos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platos`
--

LOCK TABLES `platos` WRITE;
/*!40000 ALTER TABLE `platos` DISABLE KEYS */;
INSERT INTO `platos` VALUES (1,'Arroz con Pollo','Delicioso arroz amarillo con pollo, verduras y especias caseras',12000.00,'/imagenes/platos/arroz-con-pollo.jpg',1),(2,'Bandeja Paisa','Frijoles, arroz, carne molida, chorizo, morcilla, huevo, plátano y arepa',15000.00,'/imagenes/platos/bandeja-paisa.jpg',1),(3,'Sancocho de Gallina','Sopa tradicional con gallina, yuca, plátano, mazorca y cilantro',14000.00,'/imagenes/platos/sancocho-gallina.jpg',1),(4,'Ajiaco Santafereño','Sopa de papa criolla, guascas, pollo y mazorca, servida con crema',13000.00,'/imagenes/platos/ajiaco-santafereno.jpg',1),(5,'Mondongo','Sopa de panza con verduras, especias y cilantro',11000.00,'/imagenes/platos/mondongo.jpg',1),(6,'Salmón a la Plancha','Filete de salmón fresco con vegetales salteados y salsa de mantequilla',25000.00,'/imagenes/platos/salmon-plancha.jpg',2),(7,'Lomo de Cerdo en Salsa BBQ','Jugoso lomo de cerdo glaseado con salsa BBQ casera y puré de papa',22000.00,'/imagenes/platos/lomo-cerdo-bbq.jpg',2),(8,'Pechuga Rellena','Pechuga de pollo rellena de espinacas y queso, con arroz con almendras',20000.00,'/imagenes/platos/pechuga-rellena.jpg',2),(9,'Corvina al Horno','Filete de corvina con hierbas mediterráneas y vegetales gratinados',24000.00,'/imagenes/platos/corvina-horno.jpg',2),(10,'Pollo en Salsa de Champiñones','Pechuga de pollo en cremosa salsa de champiñones con arroz pilaf',19000.00,'/imagenes/platos/pollo-champinones.jpg',2),(11,'Churrasco Premium','Corte premium de res a la parrilla con chimichurri y papas gourmet',35000.00,'/imagenes/platos/churrasco-premium.jpg',3),(12,'Langostinos al Ajillo','Langostinos frescos salteados en aceite de oliva, ajo y perejil',32000.00,'/imagenes/platos/langostinos-ajillo.jpg',3),(13,'Risotto de Hongos','Cremoso risotto italiano con hongos porcini y queso parmesano',28000.00,'/imagenes/platos/risotto-hongos.jpg',3),(14,'Filete Mignon','Tierno filete de res con reducción de vino tinto y vegetales baby',38000.00,'/imagenes/platos/filete-mignon.jpg',3),(15,'Paella Valenciana','Auténtica paella española con mariscos, pollo y azafrán',45000.00,'/imagenes/platos/paella-valenciana.jpg',3),(16,'Cordero Mediterráneo','Pierna de cordero con hierbas mediterráneas y ratatouille',42000.00,'/imagenes/platos/cordero-mediterraneo.jpg',3);
/*!40000 ALTER TABLE `platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo_electronico` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rol` enum('Administrador','Cliente') NOT NULL DEFAULT 'Cliente',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (27,'Noah','Sistema','MASCULINO','1990-05-15','admin@tusgusticos.com','3155488852','admin123','2025-08-16 14:10:07','Administrador'),(28,'Maria','Admin','FEMENINO','1989-01-31','maria.garcia@email.com','31458954','123456','2025-08-16 15:01:41','Cliente');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-16 15:22:51
