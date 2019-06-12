import { Router } from 'express'
import {
    mensajeria,

} from './controller'
const router = new Router()

router.post('/mensajeria', mensajeria)


export default router
