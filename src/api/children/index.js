import { Router } from 'express'
import {
    obtenerParvuloFrontAdmin, obtenerParvulos, nuevoNiño,
    editarParvulo, nuevoTutor, editarTutor, eliminarTutor,
    eliminarParvulo, obtenerTutorParvulo, obtenerMedicamentos,
    ingresar_retirarParvulo, ingresarComportamiento, obtenerComportamiento,
    registrarMedicamento, suministrarMedicamento, registroIngresoRetiro
} from './controller'
import {
    notificacion, getNotificacion, leerNotificacion
} from '../notification/controller'
import {
    obtenerChat, obtenerAllChats, enviarMensaje
} from '../chat/controller'

const router = new Router()
router.post('/:id/notificacion', notificacion)
router.post('/notificacion', getNotificacion)
router.put('/notificacion', leerNotificacion)

router.post('/chat', enviarMensaje)
router.post('/chats', obtenerAllChats)
router.post('/:id/chat', obtenerChat)


router.get('', obtenerParvulos)
router.post('', nuevoNiño)
router.post('/:id', obtenerParvuloFrontAdmin)
router.put('/:id', editarParvulo)
router.delete('/:id', eliminarParvulo)

router.post('/:id/tutor', nuevoTutor)
router.get('/:id/tutor', obtenerTutorParvulo)
router.put('/:id/tutor/:idtutor', editarTutor)
router.delete('/:id/tutor/:idtutor', eliminarTutor)

router.post('/:id/medicamentos', registrarMedicamento)
router.get('/:id/medicamentos', obtenerMedicamentos)
router.put('/:id/medicamentos/:id_medicamento', suministrarMedicamento)

router.post('/:id/ingreso-retiro', ingresar_retirarParvulo)
router.get('/:id/ingreso-retiro', registroIngresoRetiro)

router.post('/:id/comportamiento', ingresarComportamiento)
router.get('/:id/comportamiento', obtenerComportamiento)

/* */
/* router.post('/teacher', authTeacher)
router.post('/admin', authAdmin) */

export default router
