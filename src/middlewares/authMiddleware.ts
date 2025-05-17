import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/Users'
import { ApiError } from '../utils/apiError'

export interface AuthRequest extends Request {
  user?: any
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return next(new ApiError(401, 'Token topilmadi!'))
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number, role: string }

    const user = await User.findByPk(decoded.id)
    if (!user) return next(new ApiError(401, 'Token muddati tugagan yoki yaroqsiz!'))

    req.user = user
    next()
  } catch (error) {
 next(error)
  }
}
