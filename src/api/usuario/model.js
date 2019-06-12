import { mysql as mysqlConfig } from '../../config'

var mysql = require('mysql')
//login

export const institucion = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select nombre,correo,direccion,telefono,logo,vision from institucion where id=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const parvularios = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select nombre,lugar_estudios,certificado_in,certificado_antecedentes,correo,fotografia from parvulario where id_institucion=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const authApoderado = data => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select * from apoderado where correo=? && password=?'
    var dats = [data.email, data.password]
    connection.query(sql, dats, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const setTokenUser = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    console.log(datos)
    var sql =
      'UPDATE apoderado SET token = ? WHERE (apoderado.id = ?)'
    var dats = [
      datos.token,
      datos.id
    ]
    connection.query(sql, dats, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

/////Medicamentos

//APODERADOS aQUI
export const apoderadoParvulo = (id) => {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT A.* FROM apoderado AS A INNER JOIN APOPARVULO AS AP ON AP.id_apoderado=A.id WHERE AP.id_parvulo=?'
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log('error', error)
      else resolve(results)
    })
    connection.end()
  })
}
export const newApoderado = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.rut,
      datos.nombre,
      datos.direccion,
      datos.correo,
      datos.telefono,
      datos.fotografia,
      datos.situacion_c,
      datos.parentesco,
      datos.id_institucion
    ]
    var sql =
      'insert into apoderado(rut,nombre,direccion,correo,telefono,fotografia,situacion_c,parentesco,id_institucion) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const listaApoderados = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.query(
      'select id,nombre,fotografia,direccion,telefono,correo from apoderado',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end()
  })
}

export const apoderado = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select * from apoderado where (id=?)'
    connection.query(sql, dato, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const editApoderado = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql =
      'UPDATE apoderado SET nombre = ?, rut = ?, direccion = ?, situacion_c = ?, parentesco = ?, correo = ?, telefono= ?, fotografia = ? WHERE (apoderado.id = ?)'
    var dats = [
      datos.nombre,
      datos.rut,
      datos.direccion,
      datos.situacion_c,
      datos.parentesco,
      datos.correo,
      datos.telefono,
      datos.fotografia,
      datos.id
    ]
    connection.query(sql, dats, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const borrarApoderado = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'DELETE FROM apoderado WHERE (apoderado.id = ?)'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// PARVULOS AQUI

export const hijos = id => {
  console.log("pase por aqui")
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'SELECT P.* FROM parvulo AS P INNER JOIN APOPARVULO AS AP ON AP.id_parvulo=P.id WHERE AP.id_apoderado=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}