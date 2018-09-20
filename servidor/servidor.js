//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorPeliculas = require('./controladores/controladorPeliculas')

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/peliculas?", controladorPeliculas.mostrarPeliculas);
/* app.get("/generos", function(req, res){
  res.send("llego peticion de generos")
  console.log("llego peticion de generos")}); */
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

