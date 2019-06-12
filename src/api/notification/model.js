import { mysql as mysqlConfig } from '../../config'

var mysql = require('mysql')

export const createNotification = data => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `insert into notificacion (tipo,descripcion,titulo,leido,${data.columna}) Values (?)`
        var dats = [data.user, data.mensaje, data.titulo, 0, data.id_destino]
        console.log("dats", dats)
        connection.query(
            sql,
            [dats],
            (error, results, field) => {
                if (error) console.log(error)
                else resolve(results)
            }
        )
        connection.end()
    })
}


export const getNotification = data => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        console.log(data)
        var sql = `select * from notificacion where ${data.columna}=(?)`
        connection.query(
            sql,
            data.id_destino,
            (error, results, field) => {
                if (error) console.log(error)
                else resolve(results)
            }
        )
        connection.end()
    })
}

export const putNotification = data => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(mysqlConfig)
        connection.connect()
        var sql = `Update notificacion set leido=1 where(${data.columna}=?)`
        connection.query(sql,
            data.id_destino,
            (error, results, field) => {
                if (error) console.log(error)
                else resolve(results)
            }
        )
        connection.end()
    })
}