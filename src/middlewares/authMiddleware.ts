import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/Users'

export interface AuthRequest extends Request {
  user?: any
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Token talab qilinadi!' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: number, role: string }

    const user = await User.findByPk(decoded.id)
    if (!user) return res.status(401).json({ message: 'Tokeningiz yaroqsiz!' })

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token muddati tugagan yoki yaroqsiz!' })
  }
}
