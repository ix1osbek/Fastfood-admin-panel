
import { Router, RequestHandler } from 'express'
import { addClient, deleteClient, getAllClients, getClientById, updateClient } from '../controllers/clients.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"
import { validateBody } from '../middlewares/validate'
import { createClientSchema } from '../validators/client.validator'

const clientRouter = Router()

clientRouter.post('/clients/add_client', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, validateBody(createClientSchema), addClient as RequestHandler)
clientRouter.get('/clients', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, getAllClients as RequestHandler)
clientRouter.get('/clients/by_id/:id', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, getClientById as RequestHandler)
clientRouter.put('/clients/update_client/:id', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, validateBody(createClientSchema), updateClient as RequestHandler)
clientRouter.delete('/clients/delete_client/:id', authenticate as RequestHandler, checkRole('admin', 'superadmin') as RequestHandler, deleteClient as RequestHandler)
export default clientRouter
