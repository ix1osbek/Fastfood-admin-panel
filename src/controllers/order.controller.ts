import { NextFunction, Request, Response } from 'express'
import { Order } from '../models/order'
import { ApiError } from "../utils/apiError"



/////// create order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { totalPrice } = req.body

        if (!totalPrice) {
            return next(new ApiError(400, "Umumiy narx kiritilmagan!"))
        }

        const order = await Order.create({
            totalPrice,
            status: 'pending'
        })

        return res.status(201).json({
            message: "Buyurtma muvaffaqiyatli yaratildi!",
            order
        })
    } catch (error) {
        next(error)
    }
}


/////// get all orders
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.findAll()

        if (!orders.length) {
            return next(new ApiError(404, "Buyurtmalar topilmadi!"))
        }

        return res.status(200).json({
            message: "Buyurtmalar ro'yxati",
            orders
        })
    } catch (error) {
        next(error)
    }
}



/////// get one order
export const getOneOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const order = await Order.findByPk(id)

        if (!order) {
            return next(new ApiError(404, "Buyurtma topilmadi!"))
        }

        return res.status(200).json({
            message: "Buyurtma",
            order
        })
    } catch (error) {
        next(error)
    }
}


/////// update order

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { totalPrice, status } = req.body

        const order = await Order.findByPk(id)

        if (!order) {
            return next(new ApiError(404, "Buyurtma topilmadi!"))
        }

        if (totalPrice) {
            order.totalPrice = totalPrice
        }

        if (status) {
            order.status = status
        }

        await order.save()

        return res.status(200).json({
            message: "Buyurtma muvaffaqiyatli yangilandi!",
            order
        })
    } catch (error) {
        next(error)
    }
}


/////// delete order

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const order = await Order.findByPk(id)

        if (!order) {
            return next(new ApiError(404, "Buyurtma topilmadi!"))
        }

        await order.destroy()

        return res.status(200).json({
            message: "Buyurtma muvaffaqiyatli o'chirildi!"
        })
    } catch (error) {
        next(error)
    }
}