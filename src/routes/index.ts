import { application, Router } from 'express'
import * as ApiController from '../controller/Api.controller'

//instancia de um router para as posteriores rotas
const router = Router()

//teste
router.get('/ping', ApiController.ping)

export default router
