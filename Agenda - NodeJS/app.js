
const 	express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		RutaUsuarios = require('./server/usuario'),
		RutaCrearUsuarios = require('./server/crear_usuario'),
		RutaEventos = require('./server/evento'),
		app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', express.static(__dirname + '/client'));

//sesion
app.use(session({
	secret: '9!C#48@3uUxX',
	cookie: {maxAge: 72000000},
	resave: false,
	saveUninitialized: true
}));

//root
app.use('/usuarios', RutaUsuarios)
app.use('/usuarios', RutaCrearUsuarios)
app.use('/eventos', RutaEventos)
module.exports = app