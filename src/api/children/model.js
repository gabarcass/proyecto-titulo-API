import { mysql as mysqlConfig } from '../../config'

export const ingresoRetiro = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    console.log(id)
    connection.connect()
    var sql = 'SELECT IR.comentario,IR.tipo,IR.id_apoderado,IR.id_tutor,IR.fecha_registro,IR.hora_registro,P.nombre as nombre_parvulario, A.nombre as nombre_apoderado,T.nombre AS nombre_tutor FROM ingresoretiro AS IR INNER JOIN parvulario AS P ON P.id=IR.id_parvulario left join Tutor AS T on T.id=IR.id_tutor left join apoderado AS A on A.id=IR.id_apoderado WHERE IR.id_parvulo=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else {
        console.log(results)
        resolve(results)
      }
    })
    connection.end()
  })
}

export const sumMedicamento = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    console.log(datos)
    connection.connect()
    var sql = 'insert into suministracion(id_parvulario,id_medicamento,fecha,hora) values (?)'
    var dats = [datos.id_parvulario, datos.id, datos.fecha_envio, datos.hora_envio]
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}

var mysql = require('mysql')
export const editMedicamento = (datos) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'Update medicamento set activo=0 where(id=?)'
    connection.query(sql, datos.id, (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}

export const comportamiento = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select * from comportamiento where(id_parvulo=?)'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}


export const newComportamiento = datos => {
  return new Promise((resolve, reject) => {
    var sql
    var dats
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    if (datos.incidencia == 'reunion') {
      sql = 'insert into comportamiento(descripcion,id_parvulario,id_parvulo,incidencia,fecha,hora,fecha_registro,hora_registro) values (?)'
      dats = [datos.descripcion, datos.id_parvulario, datos.id_parvulo, datos.incidencia, datos.fecha, datos.hora, datos.fecha_registro, datos.hora_registro]
    } else {
      sql = 'insert into comportamiento(descripcion,id_parvulario,id_parvulo,incidencia,fecha_registro,hora_registro) values (?)'
      dats = [datos.descripcion, datos.id_parvulario, datos.id_parvulo, datos.incidencia, datos.fecha_registro, datos.hora_registro]
    }
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}
export const retirarIngresar = datos => {
  console.log("soy los datos", datos)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'insert into ingresoretiro(fecha_registro,hora_registro,id_parvulario,comentario,id_parvulo,' + datos.columna + ',tipo) values (?)'
    var dats = [datos.fecha_registro, datos.hora_registro, datos.id_parvulario, datos.detalle, datos.id, datos.id_encargado, datos.tipo]
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}

export const nuevoParvulo = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql =
      'insert into parvulo(rut,nombre,direccion,certificado_N,certificado_V,certificado_P,fotografia,id_institucion) values (?)'
    var dats = [
      datos.rut,
      datos.nombre,
      datos.direccion,
      datos.certificado_N,
      datos.certificado_V,
      datos.certificado_P,
      datos.fotografia,
      datos.id_institucion
    ]
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else {
        resolve(results)
      }
    })
    connection.end()
  })
}

export const parApo = (id, idapo) => {
  return new Promise((resolve, reject) => {
    var sql = 'insert into apoparvulo(id_parvulo,id_apoderado) values(?);'
    var dats = [id, idapo]
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(sql, [dats], (error, results, field) => {
      if (error) console.log('error', error)
      else resolve(results)
    })
    connection.end()
  })
}

export const listaParvulos = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(
      'select id,nombre,fotografia,direccion from parvulo',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end()
  })
}

export const parvulo = dato => {
  console.log(dato)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'SELECT P.*,A.nombre as apoderado1 from parvulo as P inner join apoparvulo as AP ON P.id=AP.id_parvulo INNER JOIN apoderado AS A ON AP.id_apoderado=A.id WHERE P.id=?'
    connection.query(sql, dato.id, (error, results, field) => {
      if (error) console.log("soy un error", error)
      else resolve(results)
    })
    connection.end()
  })
}
export const idApos = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(
      'select id_apoderado from apoparvulo where (id_parvulo=?)',
      id,
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
        connection.end()
      }
    )
  })
}

export const newTutor = data => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = "insert into tutor(id_parvulo,nombre,parentesco,rut,fotografia) values (?)"
    var dats = [data.id_parvulo, data.nombre, data.parentesco, data.rut, data.fotografia]
    connection.query(sql, [dats], (error, result, field) => {
      if (error) reject.log(error)
      else resolve(result)
    })
    connection.end()
  })
}

export const editTutor = data => {
  console.log("data", data)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = "UPDATE tutor SET id_parvulo=?,nombre=?,parentesco=?,rut=?,fotografia=? where (id=?)"
    var dats = [data.id_parvulo, data.nombre, data.parentesco, data.rut, data.fotografia, data.id]
    connection.query(sql, dats, (error, result, field) => {
      if (error) console.log(error)
      else resolve(result)
    })
    connection.end()
  })
}

export const tutor = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(
      'select * from tutor where (id_parvulo=?)',
      id,
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
        connection.end()
      }
    )
  })
}

export const deleteTutor = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'DELETE FROM tutor WHERE (tutor.id = ?)'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const newMedicamento = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'insert into medicamento(id_parvulo,nombre,dosis,hora,detalle,certificado_medico,fecha,hora_registro,fecha_registro,activo) values (?)'
    var dats = [datos.id_parvulo, datos.nombre, datos.dosis, datos.hora, datos.detalle, datos.certificado, datos.fecha, datos.hora_registro, datos.fecha_registro, 1]
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

export const medicamento = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select * from medicamento where (id_parvulo= ? and activo=1)'
    connection.query(sql, datos, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

export const editParvulo = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql =
      'UPDATE parvulo SET nombre = ?, rut = ?, direccion = ?, certificado_N = ?, certificado_V = ?, certificado_P=?, fotografia = ? WHERE (parvulo.id = ?)'
    var dats = [
      datos.nombre,
      datos.rut,
      datos.direccion,
      datos.certificado_N,
      datos.certificado_V,
      datos.certificado_P,
      datos.fotografia,
      datos.id
    ]
    connection.query(sql, dats, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const borrarParvulo = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'DELETE FROM parvulo WHERE (parvulo.id = ?)'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const apoderadoParvulo = (id) => {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT A.* FROM apoderado AS A INNER JOIN apoparvulo AS AP ON AP.id_apoderado=A.id WHERE AP.id_parvulo=?'
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log('error', error)
      else resolve(results)
    })
    connection.end()
  })
}