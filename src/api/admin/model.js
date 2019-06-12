import { mysql as mysqlConfig } from '../../config'

var mysql = require('mysql')
const nodemailer = require('nodemailer')


export const authAdministrador = data => {
  console.log("pase por aca", data)
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    let form = [data.email, data.password]
    var sql = 'select * from administrador where correo=? AND password=?'
    connection.query(
      sql,
      form,
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
  })
}

export const setTokenAdmin = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    console.log(datos)
    var sql =
      'UPDATE administrador SET token = ? WHERE (administrador.id = ?)'
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

export async function sendMail(data) {
  console.log('data', data)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'gasbriel.17@gmail.com', // Cambialo por tu email
      pass: '188903169'
    }
  })

  let mailOptions = {
    from: 'gasbriel.17@gmail.com', // sender address
    to: data.destinatarios, // list of receivers
    subject: data.asunto, // Subject line
    html: data.mensaje
  }
  console.log('info', mailOptions)

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
  console.log('info', info)
}

