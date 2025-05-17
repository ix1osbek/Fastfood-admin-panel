import parser from "../utils/multer"
import { Router, RequestHandler } from 'express'
import { createCategory} from '../controllers/category.controller'
import { authenticate } from "../middlewares/authMiddleware"
import { checkRole } from "../middlewares/roleMiddleware"

const categoryRouter = Router()
categoryRouter.post('/categories/add_category', authenticate, checkRole('admin', 'superadmin'), parser.single('img'), createCategory as RequestHandler)

export default categoryRouter