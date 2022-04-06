import { Router } from 'express'
import * as ApiController from '../controller/Api.controller'

//Instancia de um router para as posteriores rotas
const router = Router()

//Todos os IPs tor
router.get('/ips-tor', ApiController.ipsTor)

//Adicionar IP de excecoes
router.post('/add-exception', ApiController.addException)

//Todos os IPs tor com excecoes
router.get('/ips-tor-with-exceptions', ApiController.filteredIpsTor)

export default router
