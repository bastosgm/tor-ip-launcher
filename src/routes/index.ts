import { Router } from 'express'
import * as ApiController from '../controller/Api.controller'

const router = Router()

router.get('/ips-tor', ApiController.ipsTor)
router.post('/add-exception', ApiController.addException)
router.get('/ips-tor-with-exceptions', ApiController.filteredIpsTor)

export default router
