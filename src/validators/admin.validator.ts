import Joi from 'joi'

// Admin yaratish uchun validator
export const createAdminSchema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.empty': 'Login bo‘sh bo‘lmasligi kerak',
      'string.min': 'Login kamida 3 ta belgidan iborat bo‘lishi kerak',
      'string.max': 'Login 30 belgidan oshmasligi kerak',
      'any.required': 'Login kiritilishi shart'
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'Parol matn bo‘lishi kerak',
      'string.empty': 'Parol bo‘sh bo‘lmasligi kerak',
      'string.min': 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak',
      'any.required': 'Parol kiritilishi shart'
    })
})
export const updateAdminSchema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).optional().messages({
    'string.empty': 'Login bo‘sh bo‘lmasligi kerak',
    'string.min': 'Login kamida 3 ta belgidan iborat bo‘lishi kerak',
    'string.max': 'Login 30 belgidan oshmasligi kerak',
    'any.required': 'Login kiritilishi shart',
    'string.base': 'Login string bo‘lishi kerak',
    'string.alphanum': 'Login faqat harf va raqamlardan iborat bo‘lishi kerak!'

  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Parol 6 ta belgidan kam bo‘lmasligi kerak',
    'string.empty': 'Parol kiritilishi shart',
    'any.required': 'Parol kiritilishi shart'
  })
}).or('login', 'password')


export const loginSchema = Joi.object({
  login: Joi.string().required().messages({
    'any.required': 'Login kiritilishi shart',
    'string.empty': 'Login bo‘sh bo‘lmasligi kerak'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Parol kiritilishi shart',
    'string.empty': 'Parol bo‘sh bo‘lmasligi kerak'
  })
})
