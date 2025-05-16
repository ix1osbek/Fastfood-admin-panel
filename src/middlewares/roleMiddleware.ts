
import { Request, Response, NextFunction } from "express"

export function checkRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" })
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Siz uchun bu qismda ruxsat yo'q!" })
    }

    next()
  }
}

