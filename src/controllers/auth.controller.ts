
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/Users'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body
  try {
    const existingUser = await User.findOne({ where: { login } })

    if (existingUser) {
      return res.status(400).json({ message: "Bu login bilan foydalanuvchi allaqachon mavjud." });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = await User.create({
      login,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      message: "Admin muvaffaqiyatli yaratildi",
      admin: { login: newAdmin.login, role: newAdmin.role },
    });
  } catch (error: any) {
    console.error("❌ Error creating admin:", error)
    next(error);
  }
}

///////////////////// delete admin

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    await user.destroy();

    res.status(200).json({ message: "Admin muvaffaqiyatli o‘chirildi." });
  } catch (error) {
    console.error("❌ deleteAdmin xatolik:", error);
    res.status(500).json({ message: "Server xatosi." });
  }
};

//////////////// login 


export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({ message: 'login yoki parol noto‘g‘ri' })
    }


    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'login yoki parol noto‘g‘ri' });
    }
    const token = generateToken({
      id: user.id,
      login: user.login,
      role: user.role
    })
    res.status(200).json({
      message: 'Muvaffaqiyatli tizimga kirildi',
      token,
      user: {
        login: user.login
      },
    })

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }}