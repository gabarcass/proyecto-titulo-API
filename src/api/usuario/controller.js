import {

  medicamento,
  sendMail,
  hijos,
  editApoderado,
  borrarApoderado,
  apoderado,
  listaApoderados,
  newApoderado,
  apoderadoParvulo,
  newTutor,
  institucion,
  parvularios
} from './model'
var jwt = require('jsonwebtoken');

export const obtenerUsuario = (req, res) => {
  res.json({ hola: 'negro' })
}
export const obtenerInstitucion = (req, res) => {
  let id_institucion = decifrateToken(req.body.token).id_institucion
  institucion(id_institucion).then(
    result => {
      res.json(result)
    },
    error => {
      console.log(error)
    }
  )
}
export const obtenerParvularios = (req, res) => {
  let id_institucion = decifrateToken(req.body.token).id_institucion
  console.log(id_institucion)
  parvularios(id_institucion).then(
    result => {
      res.json(result)
    },
    error => {
      console.log(error)
    }
  )
}


export const obtenerHijos = (req, res) => {
  hijos(decifrateToken(req.body.token).id).then(result => {
    res.send(result)
  }, error => {
    console.log(error)
    res.json({ error: error })
  })
}


export const obtenerApoderadoParvulo = (req, res) => {
  var id = req.params.id
  apoderadoParvulo(id).then(result => {
    res.send(result)
  }, error => {
    console.log('ERRORAZO')
    res.json({ error: error })
  })
}

export const obtenerMedicamento = (req, res) => {
  medicamento(req.body).then(
    result => {
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}

export const obtenerApoderados = (req, res) => {
  listaApoderados().then(
    result => {
      res.json(result)
    },
    error => {
      res.json({ error: error })
    }
  )
}
export const obtenerApoderado = (req, res) => {
  apoderado(req.body.id).then(
    result => {
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}
export const nuevoTutor = (req, res) => {
  newTutor(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
export const nuevoApoderado = (req, res) => {
  newApoderado(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
export const editarApoderado = (req, res) => {
  editApoderado(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

export const eliminarApoderado = (req, res) => {
  var id = req.params.id
  borrarApoderado(id)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

// ----------------------Parvulos------------------
function decifrateToken(token) {
  var decoded = jwt.verify(token, 'tokent');
  return decoded
}