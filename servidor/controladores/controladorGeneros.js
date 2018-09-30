var con = require("../lib/conexionbd.js")


function cargarGeneros(req, res, fields){

    var sql = "select * from genero limit 0, 10;";
    console.log("Entro a la funcion de contriladorGeneros");
    con.query(sql, function(error, response, fields){
        debugger;
        if(error)
           { 
               console.log("Error al recibir listado de generos");
               return res.status(404).send("Error al recibir listado de generos"); 
            }
        var respuesta = {
            "generos": response
        }
        console.log(JSON.stringify(respuesta));
        res.send(JSON.stringify(respuesta))
    })

}
module.exports = {
    cargarGeneros: cargarGeneros
};