
const Router = require('express').Router(),
  Usuario = require('../server/modelo/usuario'),
  bcrypt = require("bcrypt-nodejs");

Router.get('/obtener_usuario/:email', function (req, response) {
  var email = req.params['email'];
  Usuario.find({email: email}, (err, usuario) => {
    if (err) {
      return response.status(500).send({ message: 'Error al intentar obtener el usuario. (status:500)' })
    } else {
      if (!usuario) {
        return response.status(404).send({ message: 'El usuario no existe en la base de datos. (status:404)' })
      } else {
        response.json(usuario)
      }
    }
  })
})

Router.post('/login', function (req, response) {
  let inEmail = req.body.user,
    inClave = req.body.pass,
    inSesion = req.session
  Usuario.find({ email: inEmail }, function (err, usuario_encontradoPorMail) {
    if (err) {
      return response.status(500).send({ message: 'Error al intentar obtener el usuario en el inicio de sesión. (status:500)' })
    } else {
      let pass = usuario_encontradoPorMail[0].clave;
      if (usuario_encontradoPorMail.length == 1) {
        bcrypt.compare(inClave, pass, async function (err, check) {
          if (err) {
            return response.status(500).send({ message: 'Error al intentar obtener el usuario en el inicio de sesión. (status:500)' });
          }
          if (check) {
            inSesion.usuario = usuario_encontradoPorMail[0]["email"]
            inSesion.id_usuario = usuario_encontradoPorMail[0]["_id"]
            response.send('OK')
            console.log("Te has logueado con éxito");
          } else {
            console.log('Clave incorrecta');
            response.send('Clave incorrecta')
          }
        });
      } else {
        response.send("Usuario no registrado")
      }
    }
  });
})

Router.post('/logout', function (req, response) {
  req.session.destroy(function (err) {
    if (err) {
      return response.status(500).send({ message: 'Error al intentar cerrar la sesión. (status:500)' })
    } else {
      req.session = null
      response.send('logout')
      response.end()
    }
  })
})

Router.all('/', function (req, response) {
  return response.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
})

module.exports = Router