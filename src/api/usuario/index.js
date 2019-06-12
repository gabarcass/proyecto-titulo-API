import { Router } from 'express'
import {
  obtenerApoderadoParvulo,
  obtenerMedicamento,
  mensajeria,
  obtenerApoderados,
  obtenerApoderado,
  editarApoderado,
  eliminarApoderado,
  nuevoApoderado,
  obtenerHijos,
  obtenerInstitucion,
  obtenerParvularios
} from './controller'
const router = new Router()
router.post('/children', obtenerHijos)

router.post('/parvularios', obtenerParvularios)
router.post('/institucion', obtenerInstitucion)

router.get('/:id', obtenerApoderadoParvulo)

router.post('', nuevoApoderado)
router.post('/:id', obtenerApoderado)
router.get('', obtenerApoderados)
router.put('/:id', editarApoderado)
router.delete('/:id', eliminarApoderado)


router.post('/medicamento', obtenerMedicamento)


export default router
