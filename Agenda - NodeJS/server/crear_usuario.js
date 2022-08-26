
const Router = require('express').Router(),
  Usuario = require('../server/modelo/usuario'),
  bcrypt = require("bcrypt-nodejs");

Router.get('/buscar_y_verificar_usuarios', function (req, response) {
  Usuario.find({}, (err, usuarios) => {
    if (err) {
      return response.status(500).send({ message: 'Error al intentar obtener los usuarios. (status:500)' })
    } else {
      if (usuarios.length <= 0) {
        let newUser1 = new Usuario()
        newUser1.nombre = 'Fabrizio '
        newUser1.email = 'fabrizio@gmail.com'
        newUser1.clave = '123456789'
        bcrypt.hash(newUser1.clave, null, null, async function (err, hash) {
          if (hash) {
            newUser1.clave = hash
            newUser1.save((err) => {
              if (err) return response.status(500).send({ message: 'Error al intentar insertar el usuario 1. (status:500)' })
            })
          } else {
            res.status(200).send({ message: "Error Server. ", data: undefined });
          }
        });

        let newUser2 = new Usuario()
        newUser2.nombre = 'Augusto'
        newUser2.email = 'augusto@gmail.com'
        newUser2.clave = '987654321'
        bcrypt.hash(newUser2.clave, null, null, async function (err, hash) {
          if (hash) {
            newUser2.clave = hash
            newUser2.save((err) => {
              if (err) return response.status(500).send({ message: 'Error al intentar insertar el usuario 1. (status:500)' })
            })
          } else {
            res.status(200).send({ message: "Error Server. ", data: undefined });
          }
        });
      } else {
        return res.json(usuarios)
      }
    }
  })
})

module.exports = Router

