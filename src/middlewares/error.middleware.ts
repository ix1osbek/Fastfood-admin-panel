import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
    statusCode?: number
    status?: string
    isOperational?: boolean
}
export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'

    res.status(statusCode).json({
        success: false,
        status,
        message: err.message || 'Ichki server xatosi!',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
}
