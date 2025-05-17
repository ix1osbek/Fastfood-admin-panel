
// import { RequestHandler, Router } from 'express'
// import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, login, logout, updateAdmin } from '../controllers/auth.controller'
// import { checkRole } from '../middlewares/roleMiddleware'
// import { authenticate } from '../middlewares/authMiddleware'

// const authRouter: Router = Router()
// authRouter.post('/create_admin',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, createAdmin as RequestHandler)
// authRouter.delete('/delete_admin/:id',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, deleteAdmin as RequestHandler)
// authRouter.get('/all_admins',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, getAllAdmins as RequestHandler)
// authRouter.get('/admin/:id',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, getAdminById as RequestHandler)
// authRouter.put('/update_admin/:id',authenticate as RequestHandler, checkRole("superadmin") as RequestHandler, updateAdmin as RequestHandler)
// authRouter.post("/login", login as RequestHandler)
// authRouter.post("/logout" , authenticate as RequestHandler , logout as RequestHandler)
// export default authRouter



import { RequestHandler, Router } from 'express'
import {
    createAdmin,
    deleteAdmin,
    getAdminById,
    getAllAdmins,
    login,
    logout,
    updateAdmin
} from '../controllers/auth.controller'

import { authenticate } from '../middlewares/authMiddleware'
import { checkRole } from '../middlewares/roleMiddleware'
import { validateBody } from '../middlewares/validate'
import {
    createAdminSchema,
    loginSchema,
    updateAdminSchema
} from '../validators/admin.validator'

const authRouter: Router = Router()

authRouter.post(
    '/create_admin',
    authenticate as RequestHandler,
    checkRole('superadmin') as RequestHandler,
    validateBody(createAdminSchema),
    createAdmin as RequestHandler
)

authRouter.delete(
    '/delete_admin/:id',
    authenticate as RequestHandler,
    checkRole('superadmin') as RequestHandler,
    deleteAdmin as RequestHandler
)

authRouter.get(
    '/all_admins',
    authenticate as RequestHandler,
    checkRole('superadmin') as RequestHandler,
    getAllAdmins as RequestHandler
)

authRouter.get(
    '/admin/:id',
    authenticate as RequestHandler,
    checkRole('superadmin') as RequestHandler,
    getAdminById as RequestHandler
)

authRouter.put(
    '/update_admin/:id',
    authenticate as RequestHandler,
    checkRole('superadmin') as RequestHandler,
    validateBody(updateAdminSchema),
    updateAdmin as RequestHandler
)

authRouter.post(
    '/login',
    validateBody(loginSchema),
    login as RequestHandler
)

authRouter.post(
    '/logout',
    authenticate as RequestHandler,
    logout as RequestHandler
)

export default authRouter
