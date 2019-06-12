import {
  editParvulo,
  borrarParvulo,
  tutor,
  parApo,
  nuevoParvulo,
  listaParvulos,
  parvulo,
  apoderadoParvulo,
  medicamento,
  retirarIngresar,
  newTutor,
  editTutor,
  deleteTutor,
  newComportamiento,
  comportamiento,
  newMedicamento,
  editMedicamento,
  sumMedicamento,
  ingresoRetiro
} from './model'
import {
  apoderado
} from '../usuario/model'
var jwt = require('jsonwebtoken');



export const registroIngresoRetiro = (req, res) => {
  var id = req.params.id
  ingresoRetiro(id).then(result => {
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}






export const ingresarComportamiento = (req, res) => {
  var stringToken = decifrateToken(req.body.token).id
  var datos = req.body
  datos['id_parvulario'] = stringToken
  newComportamiento(datos).then(result => {
    res.send(true)
  }).catch(error => {
    console.log(error)
  })
}

export const registrarMedicamento = (req, res) => {
  newMedicamento(req.body).then(result => {
    res.send(true)
  }).catch(error => {
    console.log(error)
  })
}


export const obtenerComportamiento = (req, res) => {
  var id = req.params.id
  comportamiento(id).then(result => {
    res.send(result)
  }).catch(error => {
    console.log(error)
  })
}

export const ingresar_retirarParvulo = (req, res) => {
  var id = req.params.id
  var stringToken = decifrateToken(req.body.token).id
  var datos = req.body
  datos['id_parvulario'] = stringToken
  datos['id'] = id
  retirarIngresar(datos).then(result => {
    res.send(true)
  })
    .catch(error => {
      console.log(error)
    })
}


export const nuevoNiño = (req, res) => {
  nuevoParvulo(req.body)
    .then(result => {
      var id = result.insertId
      parApo(id, req.body.apoderado1)
        .then(result => { })
        .catch(error => {
          console.log(error)
        })
      parApo(id, req.body.apoderado2)
        .then(result => { })
        .catch(error => {
          console.log(error)
        })
      res.json(result)
    })
    .catch(error => {
      res.json(error)
    })
}

export const obtenerParvuloFrontAdmin = (req, res) => {
  parvulo(req.body).then(result => {
    var dato = result
    res.send(dato)
  }),
    error => {
      console.log('ERRORAZO', req.body)
      res.json({ error: error })
    }

}

export const obtenerParvulos = (req, res) => {
  listaParvulos().then(
    result => {
      res.json(result)
    },
    error => {
      res.json({ error: error })
    }
  )
}

export const editarParvulo = (req, res) => {
  console.log(req.body)
  editParvulo(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
export const eliminarParvulo = (req, res) => {
  var id = req.params.id
  borrarParvulo(id)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

export const obtenerTutorParvulo = (req, res) => {
  var id = req.params.id
  tutor(id).then(
    result => {
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}
export const obtenerMedicamentos = (req, res) => {
  var id = req.params.id
  medicamento(id).then(
    result => {
      res.send(result)
    },
    error => {
      console.log(error)
      res.json({ error: error })
    }
  )
}

export const suministrarMedicamento = (req, res) => {
  let datos = req.body
  console.log(req.body)
  let id_parvulario = decifrateToken(datos.token).id
  datos['id_parvulario'] = id_parvulario
  sumMedicamento(datos).then(result => {
    editMedicamento(datos).then(result => {
      res.send(true)
    })
  }, error => {
    res.send(false)
    console.log('ERRORAZO', error)
  })
}
export const nuevoTutor = (req, res) => {
  console.log("nuevo tutor cpontroller", req.body)
  newTutor(req.body)
    .then(result => {
      res.json(true)
    })
    .catch(error => {
      res.send(false)
    })
}

export const editarTutor = (req, res) => {
  editTutor(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
export const eliminarTutor = (req, res) => {
  var id = req.params.idtutor
  deleteTutor(id)
    .then(result => {
      res.send(true)
    })
    .catch(error => {
      res.json(error)
    })
}


function decifrateToken(token) {
  var decoded = jwt.verify(token, 'tokent');
  return decoded
}