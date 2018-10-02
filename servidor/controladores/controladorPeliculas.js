var con = require("../lib/conexionbd.js")


function mostrarPeliculas(req, res, fields){

    var titulo, anio, genero = "";
    var sql = "";
    var sqlSelect = "select * from pelicula";
    var sqlCount = "select count(titulo) as total from pelicula";
    var total = 0;
    var orden = req.query.columna_orden; 
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;
    var total = 0;
    titulo = req.query.titulo;
    genero = req.query.genero;
    anio = req.query.anio;
    
    
    if(titulo){
        sql += " where titulo LIKE \"%" + titulo + "%\""; 
    }
        

    if(genero){
            if(titulo)
                sql += " AND"
            else
                sql += " where"
        sql += " genero_id = " + genero ;
    }

    if(anio){
            if(titulo || genero)
                sql += " AND"
            else
                sql += " where"
        sql += " anio = " + anio;
    }

    sqlCount = sqlCount + sql + ";";


    sql += " order by " + orden;

    if(orden == "anio" || orden == "puntuacion")
        sql+= " DESC "
        else
        sql += " ASC "
    
    sql += " LIMIT " + (cantidad*(pagina-1)) + "," + (cantidad);
    sql =  sqlSelect + sql;
   

    con.query(sqlCount, function(error, response, fields){
        if(error)
           { return res.status(404).send("Error al recibir el conteo")}
        total = response[0].total;
        console.log("El total de peliculas son: " + total);
        con.query(sql, function(error, response, fields){
            //listado = response.slice((cantidad*(pagina-1)), (cantidad*pagina));
            if(error)
               { return res.status(404).send("Error al recibir la info")}
            var respuesta = {
                "peliculas": response,
                "total": total
            }
            res.send(JSON.stringify(respuesta))
        }) 
    })


}

module.exports = {
    mostrarPeliculas: mostrarPeliculas
};