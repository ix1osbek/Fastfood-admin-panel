import { NextFunction, Request, Response } from 'express'
import { Client } from '../models/client'
import { ApiError } from "../utils/apiError"





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

/////// get all clients
export const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await Client.findAll({
            attributes: ['id', 'name', 'surname', 'phone'],
        })

        if (!clients.length) {
            return next(new ApiError(404, "Hozircha mijozlar mavjud emas!"))
        }

        return res.status(200).json(clients)
    } catch (error) {
        next(error)
    }
}

/////////////// get client by id
export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const client = await Client.findByPk(id, {
            attributes: ['id', 'name', 'surname', 'phone'],
        })

        if (!client) {
            return next(new ApiError(404, "Mijoz topilmadi!"))
        }

        return res.status(200).json(client)
    } catch (error) {
        next(error)
    }
}


/////////////// update client
export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { name, surname, phone } = req.body

        const client = await Client.findByPk(id)

        if (!client) {
            return next(new ApiError(404, "Mijoz topilmadi!"))
        }

        client.name = name
        client.surname = surname
        client.phone = phone

        await client.save()

        return res.status(200).json({
            message: "Mijoz muvaffaqiyatli yangilandi!",
            client: { id: client.id, name: client.name, surname: client.surname, phone: client.phone },
        })
    } catch (error) {
        next(error)
    }
}



////////////// delete client

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const client = await Client.findByPk(id)

        if (!client) {
            return next(new ApiError(404, "Mijoz topilmadi!"))
        }
        await client.destroy()

        return res.status(200).json({ message: "Mijoz muvaffaqiyatli o'chirildi!" })
    } catch (error) {
        next(error)
    }
}
