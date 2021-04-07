-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-04-2021 a las 13:34:40
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sitio_verde`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_men` int(11) NOT NULL,
  `nombre_men` varchar(200) CHARACTER SET utf8 NOT NULL,
  `correo_men` varchar(50) CHARACTER SET utf8 NOT NULL,
  `mensaje_men` varchar(500) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propuestas`
--

CREATE TABLE `propuestas` (
  `id_pro` int(11) NOT NULL,
  `propuesta_pro` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `imagen_pro` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usu` int(11) NOT NULL,
  `nombre_usu` varchar(100) CHARACTER SET utf8 NOT NULL,
  `apellidos_usu` varchar(100) CHARACTER SET utf8 NOT NULL,
  `usuario_usu` varchar(25) CHARACTER SET utf8 NOT NULL,
  `contra_usu` varchar(255) CHARACTER SET utf8 NOT NULL,
  `rol_usu` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usu`, `nombre_usu`, `apellidos_usu`, `usuario_usu`, `contra_usu`, `rol_usu`) VALUES
(1, 'JESUS', 'MARTINEZ', 'jesus11', '$2y$10$1Ww2K/ERHYg8o2wGljNh6.CBe7AD02t24OVlQgdeJ28uecEgRUmRi', 'A'),
(4, 'VALENTIN', 'HERNANDEZ ESPINOZA', 'tin13', '$2y$10$yU/bUq26.1KkzI6bkYGyM.Nt5zEpjjum0z0tNMhVAB/G7vIwNpStO', 'E'),
(5, 'EDGAR', 'CAMACHO CRUZ', 'kmachin', '$2y$10$Zn1AGCJkx/dI8EgwgsHZ4uNX4WZAG4u7biAM1NP/UCA7gfaLvInS2', 'A'),
(8, 'ALEJANDRA', 'VILLA ESQUIVEL', 'fanny', '$2y$10$SuejmQ/YxsHY1bx3DuyXle8aWgfzR1P9uSQm8RWc537Q47MaWdVmW', 'E');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_men`);

--
-- Indices de la tabla `propuestas`
--
ALTER TABLE `propuestas`
  ADD PRIMARY KEY (`id_pro`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `usuario_usu` (`usuario_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_men` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `propuestas`
--
ALTER TABLE `propuestas`
  MODIFY `id_pro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
