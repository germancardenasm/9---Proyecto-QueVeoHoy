
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