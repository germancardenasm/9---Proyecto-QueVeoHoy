var con = require("../lib/conexionbd.js")

function recomendarSegunSeleccion(req, res, fields){

    var genero = req.query.genero;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;
    var sqlPreferenciasUsuario = "select pelicula.id, pelicula.titulo, pelicula.poster, pelicula.trama, genero.nombre from pelicula join genero on";
    var sql = "";
    var total = 0;
   

    if(genero)
        sqlPreferenciasUsuario += " genero.id = pelicula.genero_id  where genero.nombre = \"" + genero + "\""; 

    
    if(anio_inicio){
            if(genero)
                sqlPreferenciasUsuario += " AND "
        sqlPreferenciasUsuario += "  anio BETWEEN " + anio_inicio +  " AND "+ anio_fin ;
    }
    
    if(puntuacion){
            if(genero || anio_inicio)
                sqlPreferenciasUsuario += " AND "
        sqlPreferenciasUsuario += " puntuacion >= " + puntuacion;
    }
                
    con.query(sqlPreferenciasUsuario, function(error, respuestaRecomendadas, fields){
        if(error)
            { return res.status(404).send("Error al recibir peliculas para recomendar")}
        var respuesta =  {
            peliculas: JSON.parse(JSON.stringify(respuestaRecomendadas))
        }
        res.send(JSON.stringify(respuesta))
    })


}


module.exports = {
    recomendarSegunSeleccion: recomendarSegunSeleccion
};