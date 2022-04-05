import { application, Router } from 'express'
import * as ApiController from '../controller/Api.controller'

//instancia de um router para as posteriores rotas
const router = Router()

//todos os ips absoluto
router.get('/ips-tor', ApiController.todos)

//adicionar ip de exceção
router.post('/add-exception', ApiController.add)

export default router
