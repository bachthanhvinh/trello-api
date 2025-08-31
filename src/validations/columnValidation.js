import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {

    await correctCondition.validateAsync(req.body, { abortEarly: 'false' } )
    next()
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    // boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    // chỉ định abortEarly: fasle để trả về toàn bộ lỗi validation
    // allowUnknown để bảo qua không check những trường từ bên ngoài khác title, description, type
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    // Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang controller
    next()
  } catch (error) {
    next(new ApiError( StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message ))
  }
}

export const columnValidation = {
  createNew,
  update
}