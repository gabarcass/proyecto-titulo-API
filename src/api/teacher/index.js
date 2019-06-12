import { Router } from 'express'
import {
    obtenerParvularios,
    nuevoPar,
    obtenerParvulario,
    editarParvulario,
    eliminarParvulario,
  } from './controller'
  const router = new Router()


router.post('', nuevoPar)
router.get('', obtenerParvularios)
router.post('/:id', obtenerParvulario)
router.put('/:id', editarParvulario)
router.delete('/:id', eliminarParvulario)

export default router
