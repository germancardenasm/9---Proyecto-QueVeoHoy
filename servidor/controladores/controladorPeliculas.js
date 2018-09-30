var con = require("../lib/conexionbd.js")


function mostrarPeliculas(req, res, fields){

    var titulo, anio, genero = "";
    var sql = "select * from pelicula where "
    titulo = req.query.titulo;
    genero = req.query.genero;
    anio = req.query.anio;

    if(titulo)
        sql += "titulo LIKE \"%" + titulo + "%\""; 

    if(genero){
            if(titulo)
                sql += " AND"
        sql += " genero_id = " + genero ;
    }

    if(anio){
            if(titulo || genero)
                sql += " AND"
        sql += " anio = " + anio;
    }

    sql += ";"
    //var sql = "select * from pelicula where "+titulo+ " "+genero+ " " +anio + ";";
    debugger;
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