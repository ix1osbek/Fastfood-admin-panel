
import { Router, RequestHandler } from 'express'
import { addClient } from '../controllers/clients.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"

const clientRouter = Router()

clientRouter.post('/clients/add_client', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, addClient as RequestHandler)

export default clientRouter
