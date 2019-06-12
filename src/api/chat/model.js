import { mysql as mysqlConfig } from '../../config'

var mysql = require('mysql')


export const obtainAllChats = datos => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `SELECT c.*,u.nombre,u.fotografia FROM conversacion AS c INNER JOIN ${datos.tabla} AS u ON c.${datos.columna_destino}=u.id WHERE c.${datos.columna}=?`
        console.log(sql)
        connection.query(sql, datos.id_user, (error, results, field) => {
            if (error) console.log(error)
            else {
                console.log(results)
                resolve(results)
            }
        })
        connection.end()
    })
}

export const obtainChat = datos => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `SELECT * from mensaje where id_conversacion=?`
        connection.query(sql, datos.id, (error, results, field) => {
            if (error) console.log(error)
            else {
                console.log(results)
                resolve(results)
            }
        })
        connection.end()
    })
}

export const sendMensaje = datos => {
    return new Promise((resolve, reject) => {
        console.log("soy los datos", datos)
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `insert into mensaje(id_conversacion,mensaje,fecha_envio,leido,id_emisor,rol_emisor) values(?)`
        var dats = [datos.id, datos.mensaje, datos.fecha_envio, 0, datos.id_emisor, datos.rol]
        connection.query(sql, [dats], (error, results, field) => {
            if (error) console.log(error)
            else {
                console.log(results)
                resolve(results)
            }
        })
        connection.end()
    })
}

export const newChat = datos => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `insert into conversacion(id_apoderado,id_parvulario) values(?)`
        var dats = [datos.id_apoderado, datos.id_parvulario]
        connection.query(sql, [dats], (error, results, field) => {
            if (error) console.log(error)
            else {
                console.log(results)
                resolve(results)
            }
        })
        connection.end()
    })
}