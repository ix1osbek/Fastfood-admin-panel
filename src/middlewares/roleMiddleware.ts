
import { Request, Response, NextFunction } from "express"
import { ApiError } from '../utils/apiError'

export function checkRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return next(new ApiError(401, "Foydalanuvchi topilmadi!"))
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new ApiError(403, "Sizda ushbu amalni bajarish huquqi yo'q!"))
    }
    next()
  }
}

