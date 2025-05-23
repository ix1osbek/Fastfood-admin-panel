
import { RequestHandler, Router } from 'express'
import { createOrder, getAllOrders, getOneOrder } from "../controllers/order.controller"
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"
const orderRouter = Router()
orderRouter.post('/orders/create', authenticate, checkRole('admin', 'superadmin'), createOrder as RequestHandler)
orderRouter.get('/orders', authenticate, checkRole('admin', 'superadmin'), getAllOrders as RequestHandler)
orderRouter.get('/orders/by-id/:id', authenticate, checkRole('admin', 'superadmin'), getOneOrder as RequestHandler)
orderRouter.put('/orders/update/:id', authenticate, checkRole('admin', 'superadmin'), getOneOrder as RequestHandler)
orderRouter.delete('/orders/delete/:id', authenticate, checkRole('admin', 'superadmin'), getOneOrder as RequestHandler)


export default orderRouter