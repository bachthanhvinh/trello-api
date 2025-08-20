import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required value',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters',
      'string.max': 'Title length must be less than or equal to 50 characters',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log('res.body', req.body)
    // chỉ định abortEarly: fasle để trả về toàn bộ lỗi validation
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'Post: API Create new board' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errror: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}