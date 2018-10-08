
-- En las dos primeras guias no guardé las sintaxis de la creacion de las tablas 
--asi que tuve al final que usar el comando SHOW CREATE TABLE de las tablas "genero" y "Pelicula" para guardar aqui el script.


CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `director` varchar(400) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL,
  `puntuacion` decimal(2,1) DEFAULT NULL,
  `poster` varchar(300) DEFAULT NULL,
  `trama` varchar(700) DEFAULT NULL,
  `genero_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genero_id` (`genero_id`),
  CONSTRAINT `pelicula_ibfk_1` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`)
) 

CREATE TABLE actor
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(70) NOT NULL,  
);

CREATE TABLE actor_pelicula
(
    id INT NOT NULL AUTO_INCREMENT,
    actor_id int NOT NULL,
    pelicula_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (pelicula_id) REFERENCES  pelicula(id)
);