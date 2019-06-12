import { createNotification, getNotification, putNotification } from "./model";
import { apoderadoParvulo } from '../usuario/model'
import { listaParvularios } from '../teacher/model'
var jwt = require('jsonwebtoken');


export const notificacion = (req, res) => {
    var id = req.params.id
    var datos = req.body
    if (datos.rol == 'user') {
        datos['columna'] = 'id_apoderado'
        apoderadoParvulo(id).then(apoderados => {
            console.log("habers", apoderados.length)
            for (let key in apoderados) {
                datos['id_destino'] = apoderados[key].id
                createNotification(datos).then(result => {
                    console.log(result)
                }).catch(error => {
                    res.json(error)
                })
            }
            res.send(true)
        })
            .catch(error => {
                res.json(error)
            })
    } else {
        datos['columna'] = 'id_parvulario'
        listaParvularios().then(parvularios => {
            for (let key in parvularios) {
                datos['id_destino'] = parvularios[key].id
                createNotification(datos).then(result => {
                    console.log(result)
                })
            }
            res.send(true)
        }).catch(error => {
            res.json(error)
        })
    }
}

export const getNotificacion = (req, res) => {
    var datos = req.body
    datos['id_destino'] = decifrateToken(req.body.token).id
    if (datos['rol'] == 'user') {
        datos['columna'] = 'id_apoderado'
    } else {
        datos['columna'] = 'id_parvulario'
    }
    getNotification(datos).then(notificaciones => {
        res.send(notificaciones)
    }).catch(error => {
        res.json(error)
    })
}

export const leerNotificacion = (req, res) => {
    var datos = req.body
    datos['id_destino'] = decifrateToken(req.body.token).id
    if (datos['rol'] == 'user') {
        datos['columna'] = 'id_apoderado'
    } else {
        datos['columna'] = 'id_parvulario'
    }
    putNotification(datos).then(notificaciones => {
        res.send(notificaciones)
    }).catch(error => {
        res.json(error)
    })
}



function decifrateToken(token) {
    var decoded = jwt.verify(token, 'tokent');
    return decoded
}

