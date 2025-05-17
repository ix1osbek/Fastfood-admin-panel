import { NextFunction, Request, Response } from 'express'
import { Client } from '../models/client'
import {ApiError} from "../utils/apiError"





/////// add client

export const addClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, surname, phone } = req.body

        const existingClient = await Client.findOne({ where: { phone } })

        if (existingClient) {
            return next(new ApiError(400, "Bu telefon raqami allaqachon mavjud. Iltimos boshqa telefon raqamini kiriting!"))
        }

        const newClient = await Client.create({
            name,
            surname,
            phone
        })

        return res.status(201).json({
            message: "Mijoz muvaffaqiyatli yaratildi!",
            client: { id: newClient.id, name: newClient.name, surname: newClient.surname, phone: newClient.phone },
        })
    } catch (error) {
        next(error)
    }
}




