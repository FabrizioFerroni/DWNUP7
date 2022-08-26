
const express = require('express'),
		mongoose = require('mongoose'),
		app = require('./app'),
		port = process.env.PORT || 3000

		console.log("Iniciando servidor... Espere que se carguen todos los modulos por favor \n");

//conexion
mongoose.connect('mongodb://localhost:27017/db_agenda', {useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
	if (err) return console.log('Error en la conexión con la base de datos '+err)
	console.log('Conexión establecida con la base de datos db_agenda en el puerto: 27017')
	app.listen(port, function() {
  		console.log('Servidor corriendo en http://localhost:'+port+"/")
	})
})
