var mongoose = require('mongoose'),
		esquema = mongoose.Schema

var	esquema_usuario = new esquema({
	nombre: {type: String},
	email: {type: String, unique: true},
	clave: {type: String, required: true}
})

module.exports = mongoose.model('Usuario', esquema_usuario)