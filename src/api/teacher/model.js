import { mysql as mysqlConfig } from '../../config'

var mysql = require('mysql')

export const authParvulario = data => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats=[data.email,data.password]
    console.log("dats",dats)
    var sql = 'select * from parvulario where correo=? AND password=?'
    connection.query(
      sql,
      dats,
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end()
  })
}
export const setTokenTeacher = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql =
      'UPDATE parvulario SET token = ? WHERE (parvulario.id = ?)'
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

export const nuevoParvulario = datos => {
    return new Promise((resolve, reject) => {
      console.log('LLege acas')
      const connection = mysql.createConnection(mysqlConfig)
      connection.connect()
      var sql =
        'insert into parvulario(rut,nombre,direccion,lugar_estudios,certificado_in,certificado_antecedentes,correo,telefono,fotografia,id_institucion) values (?)'
      var dats = [
        datos.rut,
        datos.nombre,
        datos.direccion,
        datos.lugar_estudios,
        datos.certificado_in,
        datos.certificado_antecedentes,
        datos.correo,
        datos.telefono,
        datos.fotografia,
        datos.id_institucion
      ]
      connection.query(sql, [dats], (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      })
      connection.end()
    })
  }
  
  export const listaParvularios = () => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(mysqlConfig)
      connection.connect()
      connection.query(
        'select id,nombre,fotografia,direccion,telefono,correo from parvulario',
        (error, results, field) => {
          if (error) reject(error)
          else resolve(results)
        }
      )
    })
  }
  
  export const parvulario = dato => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(mysqlConfig)
      connection.connect()
      var sql = 'select * from parvulario where (id=?)'
      connection.query(sql, dato.id, (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      })
      connection.end()
    })
  }
  
  export const editParvulario = datos => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(mysqlConfig)
      connection.connect()
      var sql =
        'UPDATE parvulario SET nombre = ?, rut = ?, direccion = ?, lugar_estudios = ?, certificado_in = ?, certificado_antecedentes=?, correo = ?, telefono= ?, fotografia = ? WHERE (parvulario.id = ?)'
      var dats = [
        datos.nombre,
        datos.rut,
        datos.direccion,
        datos.lugar_estudios,
        datos.certificado_in,
        datos.certificado_antecedentes,
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
  
  export const borrarParvulario = id => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(mysqlConfig)
      connection.connect()
      var sql = 'DELETE FROM parvulario WHERE (parvulario.id = ?)'
      connection.query(sql, id, (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      })
      connection.end()
    })
  }
  