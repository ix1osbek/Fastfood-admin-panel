import { NextFunction, Request, Response } from 'express'
import { Category } from '../models/category'
import { ApiError } from "../utils/apiError"
import {Product} from "../models/Products"


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
}


///////// get all categories
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.findAll()
        if (categories.length === 0) {
            return next(new ApiError(404, "Kategoriya topilmadi!"))
        }
        return res.status(200).json({
            message: "Barcha kategoriyalar",
            categories
        })
    } catch (error) {
        next(error)
    }
}


///////// get category by id
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id,{
            include: {
                model: Product,
                as: 'products'
            }
        })
        if (!category) {
            return next(new ApiError(404, "Kategoriya topilmadi!"))
        }
        return res.status(200).json({
            category
        })
    } catch (error) {
        next(error)
    }
}



///////// update category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { title } = req.body
        if (!req.file) {
            return next(new ApiError(400, "Rasm yuklashda xatolik!"))
        }

        const imgUrl = req.file.path

        const category = await Category.findByPk(id)
        if (!category) {
            return next(new ApiError(404, "Kategoriya topilmadi!"))
        }

        await Category.update({
            title,
            img: imgUrl
        }, {
            where: {
                id
            }
        })

        return res.status(200).json({
            message: "Kategoriya muvaffaqiyatli yangilandi!",
            category: {
                id,
                title,
                img: imgUrl
            }
        })
    } catch (error) {
        next(error)
    }
}



/////////////   delete category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const category = await Category.findByPk(id)
        if (!category) {
            return next(new ApiError(404, "Kategoriya topilmadi!"))
        }
        await Category.destroy({
            where: {
                id
            }
        })
        return res.status(200).json({
            message: "Kategoriya muvaffaqiyatli o'chirildi!"
        })
    } catch (error) {
        next(error)
    }
}