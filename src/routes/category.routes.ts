import parser from "../utils/multer"
import { Router, RequestHandler } from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"

const categoryRouter = Router()
categoryRouter.post('/categories/add_category', authenticate, checkRole('admin', 'superadmin'), parser.single('img'), createCategory as RequestHandler)
categoryRouter.get('/categories', authenticate, checkRole('admin', 'superadmin'), getAllCategories as RequestHandler)
categoryRouter.get('/categories/by_id/:id', authenticate, checkRole('admin', 'superadmin'), getCategoryById as RequestHandler)
categoryRouter.put('/categories/update/:id', authenticate, checkRole('admin', 'superadmin'), parser.single("img"), updateCategory as RequestHandler)
categoryRouter.delete("/categories/delete/:id", authenticate, checkRole('admin', 'superadmin'), deleteCategory as RequestHandler)
export default categoryRouter