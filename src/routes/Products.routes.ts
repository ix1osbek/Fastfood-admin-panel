import parser from "../utils/multer"
import { Router, RequestHandler } from 'express'
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/Products.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"


const productRouter = Router()
productRouter.post('/products/create_product', authenticate, checkRole('admin', 'superadmin'), parser.single("img"), createProduct as RequestHandler)
productRouter.get('/products', authenticate, checkRole('admin', 'superadmin'), getAllProducts as RequestHandler)
productRouter.get('/products/by-id/:id', authenticate, checkRole('admin', 'superadmin'), getOneProduct as RequestHandler)
productRouter.put('/products/update/:id', authenticate, checkRole('admin', 'superadmin'), parser.single("img"), updateProduct as RequestHandler)
productRouter.delete('/products/delete/:id', authenticate, checkRole('admin', 'superadmin'), deleteProduct as RequestHandler)

export default productRouter