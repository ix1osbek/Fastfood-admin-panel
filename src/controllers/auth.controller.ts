
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/Users'
import bcrypt from 'bcrypt'
import { generateToken, generateRefreshToken } from '../utils/jwt'
import { ApiError } from '../utils/apiError'


export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body
  try {
    const existingUser = await User.findOne({ where: { login } })

    if (existingUser) {
      return next(new ApiError(400, "Bu login allaqachon mavjud. Iltimos boshqa logindan foydalaning!"))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = await User.create({
      login,
      password: hashedPassword,
      role: "admin",
    })

    return res.status(201).json({
      message: "Admin muvaffaqiyatli yaratildi!",
      admin: { login: newAdmin.login, role: newAdmin.role },
    })
  } catch (error: any) {
    next(error)
  }
}

///////////////////// delete admin

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)

    if (!user) {
      return next(new ApiError(404, "Admin topilmadi!"))
    }

    await user.destroy()

    res.status(200).json({ message: "Admin muvaffaqiyatli o'chirildi!" })
  } catch (error) {
    next(error)
  }
}


/////////// get all admins
export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admins = await User.findAll({
      where: { role: 'admin' },
      attributes: ['id', 'login', 'role'],
    })

    res.status(200).json(admins)
  } catch (error) {
    next(error)
  }
}


///////////////////// get admin by id
export const getAdminById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const admin = await User.findByPk(id, {
      attributes: ['id', 'login', 'role'],
    })

    if (!admin) {
      return next(new ApiError(404, "Admin topilmadi!"))
    }
    res.status(200).json(admin)
  } catch (error) {
    next(error)
  }
}

/////    update admin
export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { login, password } = req.body

    const admin = await User.findByPk(id)

    if (!admin) {
      return next(new ApiError(404, "Admin topilmadi!"))
    }

    if (login) {
      admin.login = login
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      admin.password = hashedPassword
    }

    await admin.save()
    res.status(200).json({ message: 'Admin muvaffaqiyatli yangilandi', admin: { id: admin.id, login: admin.login } })
  } catch (error) {
    next(error)
  }
}
//////////////// login 

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body

    const user = await User.findOne({ where: { login } })
    if (!user) {
      return next(new ApiError(401, 'login yoki parol xato!'))
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return next(new ApiError(401, 'login yoki parol xato!'))
    }

    const accessToken = generateToken({
      id: user.id,
      login: user.login,
      role: user.role
    })

    const refreshToken = generateRefreshToken({
      id: user.id,
      login: user.login,
      role: user.role
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      message: 'Muvaffaqiyatli tizimga kirildi',
      accessToken,
      user: {
        login: user.login
      }
    })

  } catch (error) {
    next(error)
  }
}


////////// logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })

    res.status(200).json({ message: 'Muvaffaqiyatli tizimdan chiqildi' })
  } catch (error) {
    next(error)
  }
}