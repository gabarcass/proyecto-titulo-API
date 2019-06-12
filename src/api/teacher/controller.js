import {
    listaParvularios,
    parvulario,
    nuevoParvulario,
    editParvulario,
    borrarParvulario,
  } from './model'

export const obtenerParvularios = (req, res) => {
    listaParvularios().then(
      result => {
        res.json(result)
      },
      error => {
        res.json({ error: error })
      }
    )
  }
  
  export const nuevoPar = (req, res) => {
    console.log('hola soy el gabi', req.body)
    nuevoParvulario(req.body)
      .then(result => {
        console.log('resultado', result)
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      })
  }
  export const obtenerParvulario = (req, res) => {
    parvulario(req.body).then(
      result => {
        res.send(result)
      },
      error => {
        console.log('ERRORAZO')
        res.json({ error: error })
      }
    )
  }
  export const editarParvulario = (req, res) => {
    editParvulario(req.body)
      .then(result => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      })
  }
  
  export const eliminarParvulario = (req, res) => {
    var id = req.params.id
    borrarParvulario(id)
      .then(result => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      })
  }
  
  