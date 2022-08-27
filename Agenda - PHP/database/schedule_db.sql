-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-08-2022 a las 18:21:44
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `schedule_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `init_date` date NOT NULL,
  `init_hour` time NOT NULL,
  `end_date` date DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `complete_day` tinyint(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `event`
--

INSERT INTO `event` (`id`, `title`, `init_date`, `init_hour`, `end_date`, `end_hour`, `complete_day`, `user_id`) VALUES
(2, 'Evento checked bd', '2022-08-12', '00:00:00', '0000-00-00', '00:00:00', 1, 1),
(3, 'Evento not checked', '2022-08-24', '08:00:00', '2022-08-24', '09:30:00', 0, 1),
(4, 'Primera Compra', '2022-08-26', '08:00:00', '2022-08-27', '08:00:00', 0, 1),
(6, 'Primera Compra', '2022-08-02', '00:00:00', '0000-00-00', '00:00:00', 1, 1),
(7, 'Primera Compra', '2022-08-22', '00:00:00', '0000-00-00', '00:00:00', 1, 1),
(8, 'Checked borrar luego de enviar', '2022-08-18', '00:00:00', '0000-00-00', '00:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `nombre`, `email`, `password`, `birthdate`) VALUES
(1, 'Fabrizio', 'fabrizio@mail.com', '$2y$10$z.RrWs5vlGLXpHlZweBWqOqScfhKluh29VcVuglKHo5oYuKn4uJCK', '2000-10-09'),
(2, 'FF', 'ff@mail.com', '$2y$10$DFLaRrXPTPs91rYmtewdfuaTn6UmqNrPq7MlXcBJeehbky/PVwwG.', '2014-05-19'),
(3, 'Fabrizio Ferroni', 'fabrizio.ferroni@mail.com', '$2y$10$eSnPpnqGJ5qZMK/HWABd9u6.P0QMzpOgFCabWSC3v5zlHs7FNUhoe', '1996-10-16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
