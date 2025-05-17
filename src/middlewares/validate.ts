import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { ApiError } from '../utils/apiError'

export const validateBody = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            next(new ApiError(400, error.details.map((err) => err.message).join(', ')))
            return
        }
        next()
    }
}   
