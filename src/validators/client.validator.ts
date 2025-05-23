import Joi from "joi";

export const createClientSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
        .messages({
            'string.empty': 'Ism bo‘sh bo‘lmasligi kerak',
            'string.min': 'Ism kamida 2 ta belgidan iborat bo‘lishi kerak',
            'string.max': 'Ism 30 belgidan oshmasligi kerak',
            'any.required': 'Ism kiritilishi shart'
        }),
    surname: Joi.string().min(2).max(30).required()
        .messages({
            'string.empty': 'Familiya bo‘sh bo‘lmasligi kerak',
            'string.min': 'Familiya kamida 2 ta belgidan iborat bo‘lishi kerak',
            'string.max': 'Familiya 30 belgidan oshmasligi kerak',
            'any.required': 'Familiya kiritilishi shart'
        }),
    phone: Joi.string().pattern(/^\+998\d{9}$/).required()
        .messages({
            'string.empty': 'Telefon raqami bo‘sh bo‘lmasligi kerak',
            'string.pattern.base': 'Telefon raqami +998 bilan boshlanishi va 12 ta raqamdan iborat bo‘lishi kerak',
            'any.required': 'Telefon raqami kiritilishi shart'
        }),

    orderId: Joi.number().required()
})