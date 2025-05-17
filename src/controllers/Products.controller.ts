import { NextFunction, Request, Response } from 'express'
import { Product } from '../models/Products'
import { ApiError } from "../utils/apiError"



///// create product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, price, description } = req.body
        if (!req.file) {
            return next(new ApiError(400, "Rasm yuklashda xatolik!"))
        }
        const imgUrl = req.file.path
        const product = await Product.create({
            title,
            price,
            description,
            img: imgUrl
        })

        res.status(201).json({
            message: "Mahsulot muvaffaqiyatli yaratildi!",
            product: {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                img: product.img
            }
        })
    } catch (error) {
        next(error)
    }
}


//////// get all products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll()
        if (!products.length) {
            return next(new ApiError(404, "Mahsulotlar topilmadi!"))
        }

        res.status(200).json({
            message: "Mahsulotlar ro'yxati",
            products
        })
    } catch (error) {
        next(error)
    }
}


//////// get one product
export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return next(new ApiError(404, "Mahsulot topilmadi!"))
        }

        res.status(200).json({
            message: "Mahsulot",
            product
        })
    } catch (error) {
        next(error)
    }
}


//////// update product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { title, price, description } = req.body

        const product = await Product.findByPk(id)
        if (!product) {
            return next(new ApiError(404, "Mahsulot topilmadi!"))
        }
        if (req.file) {
            product.img = req.file.path
        }
        if (title !== undefined) product.title = title
        if (price !== undefined) product.price = price
        if (description !== undefined) product.description = description

        await product.save()

        res.status(200).json({
            message: "Mahsulot muvaffaqiyatli yangilandi!",
            product
        })
    } catch (error) {
        next(error)
    }
}


////////// delete product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return next(new ApiError(404, "Mahsulot topilmadi!"))
        }
        await product.destroy()
        res.status(200).json({
            message: "Mahsulot muvaffaqiyatli o'chirildi!"
        })
    } catch (error) {
        next(error)
    }
}