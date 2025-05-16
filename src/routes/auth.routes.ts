
import { RequestHandler, Router } from 'express';
import { createAdmin, deleteAdmin, getAllAdmins, login } from '../controllers/auth.controller';
import { checkRole } from '../middlewares/roleMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const authRouter: Router = Router()
authRouter.post('/create_admin',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, createAdmin as RequestHandler)
authRouter.delete('/delete_admin/:id',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, deleteAdmin as RequestHandler)
authRouter.get('/all_admins',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, getAllAdmins as RequestHandler)
authRouter.post("/login", login as RequestHandler)

export default authRouter
