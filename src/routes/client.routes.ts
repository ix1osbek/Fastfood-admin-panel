
import { Router, RequestHandler } from 'express'
import { addClient } from '../controllers/clients.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"
import { validateBody } from '../middlewares/validate'
import { createClientSchema } from '../validators/client.validator'

const clientRouter = Router()

clientRouter.post('/clients/add_client', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, validateBody(createClientSchema), addClient as RequestHandler)

export default clientRouter
