var con = require("../lib/conexionbd.js")


function obtenerDetallePelicula(req, res, fields){

    var id = req.params.id;
    var sql = "";
    var sqlSelect = "select * from pelicula where id = " + id;

   

    con.query(sqlSelect, function(error, response, fields){
        
        if(error)
        { return res.status(404).send("Error al recibir el detalle de la pelicula")}
        var sqlActorPelicula = "Select nombre from actor join actor_pelicula on actor.id = actor_pelicula.actor_id AND actor_pelicula.pelicula_id = " + response[0].id;
        con.query(sqlActorPelicula, function(error, responseActor, fields){
            if(error)
            { return res.status(404).send("Error al recibir el detalle de los actores")}

                    var respuesta = {
                        pelicula:{
                            "id": response[0].id,
                            "titulo": response[0].titulo,
                            "duracion": response[0].duracion,
                            "director":response[0].director,
                            "anio":response[0].anio,
                            "fecha_lanzamiento":response[0].fecha_lanzamiento,
                            "puntuacion":response[0].puntuacion,
                            "poster":response[0].poster,
                            "trama":response[0].trama,
                            "genero_id":response[0].genero_id,
                            "nombre":""
                        },
                        actores: responseActor,
                        genero: response[0].genero_id
                        
                    }
                    var sqlGenero = "select nombre from genero where id = " + respuesta.genero;
                    con.query(sqlGenero, function(error, responseGenero, fields){
                        if(error)
                        { return res.status(404).send("Error al recibir el detalle del genero")}
                        respuesta.pelicula.nombre = responseGenero[0].nombre;
                        res.send(JSON.stringify(respuesta))

                    })
                })
    })
}
module.exports = {
    obtenerDetallePelicula: obtenerDetallePelicula
};