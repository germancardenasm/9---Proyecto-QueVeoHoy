var con = require("../lib/conexionbd.js")


function mostrarPeliculas(req, res, fields){

    var sql = "select * from pelicula LIMIT 0,10";

    con.query(sql, function(error, response, fields){
        if(error)
           { return res.status(404).send("Error al recibir la info")}
        var respuesta = {
            "peliculas": response
        }
        res.send(JSON.stringify(respuesta))
    })

}
module.exports = {
    mostrarPeliculas: mostrarPeliculas
};