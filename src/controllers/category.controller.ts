import { NextFunction, Request, Response } from 'express'
import { Category } from '../models/category'
import { ApiError } from "../utils/apiError"


///////// create category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.body;

        if (!req.file) {
            return next(new ApiError(400, "Rasm yuklanishi majburiy!"));
        }   

        const imgUrl = req.file.path

        const existingCategory = await Category.findOne({ where: { title } });

        if (existingCategory) {
            return next(new ApiError(400, "Bu nomli kategoriya allaqachon mavjud. Iltimos boshqa nom kiriting!"));
        }

        const newCategory = await Category.create({
            title,
            img: imgUrl,
        });

        return res.status(201).json({
            message: "Kategoriya muvaffaqiyatli yaratildi!",
            category: {
                id: newCategory.id,
                title: newCategory.title,
                img: newCategory.img,
            },
        });
    } catch (error) {
        next(error)
    }
};