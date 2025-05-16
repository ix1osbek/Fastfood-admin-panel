
import { RequestHandler, Router } from 'express';
import { createAdmin, login } from '../controllers/auth.controller';
import { checkRole } from '../middlewares/roleMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const authRouter: Router = Router()
authRouter.post('/create_admin',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, createAdmin as RequestHandler)

authRouter.post("/login", login as RequestHandler)

export default authRouter
