import { obtainAllChats, obtainChat, sendMensaje, newChat } from './model'
var jwt = require('jsonwebtoken');




export const obtenerAllChats = (req, res) => {
    console.log("what")
    var datos = req.body
    datos['id_user'] = decifrateToken(req.body.token).id
    if (datos['rol'] == 'user') {
        datos['columna'] = 'id_apoderado'
        datos['columna_destino'] = 'id_parvulario'
        datos['tabla'] = 'parvulario'
    } else {
        datos['columna'] = 'id_parvulario'
        datos['tabla'] = 'apoderado'
        datos['columna_destino'] = 'id_apoderado'
    }
    console.log(datos)
    obtainAllChats(datos).then(chats => {
        res.send(chats)
    }).catch(error => {
        res.json(error)
    })
}

export const obtenerChat = (req, res) => {
    obtainChat(req.body).then(chat => {
        for (let key in chat) {
            console.log("guapura", chat[key])
            chat[key]['rol'] = req.body.rol
        }
        res.send(chat)
    }).catch(error => {
        res.json(error)
    })
}
export const enviarMensaje = (req, res) => {
    var datos = req.body
    if (req.body.id) {
        if (req.body.rol == 'user') datos['id_emisor'] = datos.id_apoderado
        else datos['id_emisor'] = datos.id_parvulario
        sendMensaje(datos).then(result => {
            console.log(result)
        })
    } else {
        newChat(datos).then(result => {
            console.log(results)
        })

        res.send(chat)

    }
}
function decifrateToken(token) {
    var decoded = jwt.verify(token, 'tokent');
    return decoded
}
