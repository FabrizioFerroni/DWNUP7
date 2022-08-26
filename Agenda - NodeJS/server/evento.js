
const Router = require('express').Router(),
  Evento = require('../server/modelo/evento')

Router.get('/obtener_eventos/:id', function (req, response) {
  let id = req.params['id'];
  Evento.find({ id_usuario: id }, (err, eventos) => {
    if (err) {
      return response.send("Error al intentar obtener los eventos. (status:500)")
    } else {
      if (!eventos) {
        return response.send({ message: 'No exiten eventos en la base de datos. (status:404)' })
      } else {
        response.json(eventos)
      }
    }
  })
})

Router.post('/insertar_evento/:id', function (req, response) {
  let id = req.params['id'];
  let nuevoEvento = new Evento()
  nuevoEvento.id_usuario = id
  nuevoEvento.title = req.body.title
  nuevoEvento.start = req.body.start
  nuevoEvento.end = req.body.end
  nuevoEvento.allDay = req.body.allDay
  console.log(nuevoEvento);
  nuevoEvento.save((err) => {
    if (err && err.code != 11000) {
      return response.send("Error al intentar insertar el evento. (status:500)")
    } else if (err && err.code == 11000) {
      return response.send("Error al intentar insertar el evento. Email registrado (status:200 code:'+err.code+')")
    } else {
      return response.send("El evento ha sido insertado correctamente")
    }
  })
})

Router.post('/actualizar_evento', function (req, response) {
  let eventoID = req.query._id;
  Evento.findById(eventoID, (err, evento) => {
    if (err) {
      return response.send("Error al intentar hallar el evento. (status:500)")
    } else {
      let start = req.body.start,
        end = req.body.end
      Evento.updateOne({ _id: eventoID }, {
        start: start,
        end: end
      }, (err) => {
        if (err) {
          return response.send("Error al intentar actualizar el evento. (status:500)")
        } else {
          response.send('El evento ha sido actualizado correctamente')
        }
      })
    }
  })
})

Router.post('/eliminar_evento', function (req, res) {
  let eventoID = req.query._id;
  Evento.findById(eventoID, (err, evento) => {
    if (err) {
      return res.status(500).send({ message: 'Error al intentar hallar el evento. (status:500)' })
    } else {
      evento.remove(err => {
        if (err) {
          return res.status(500).send({ message: 'Error al intentar borrar el evento. (status:500)' })
        } else {
          res.send('El evento ha sido borrado correctamente')
        }
      })
    }
  })
})

Router.all('/', function (req, res) {
  return res.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
})


module.exports = Router