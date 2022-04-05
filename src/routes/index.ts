import { application, Router } from 'express'
import * as ApiController from '../controller/Api.controller'

//instancia de um router para as posteriores rotas
const router = Router()

//todos os ips tor
router.get('/ips-tor', ApiController.todos)

//adicionar ip de exceção
router.post('/add-exception', ApiController.adicionar)

//todos os ips tor com exceções
router.get('/ips-tor-with-exceptions', ApiController.todosFiltrado)

export default router
