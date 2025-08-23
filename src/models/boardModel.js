import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validate = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validate)
  } catch (error) { throw new Error(error) }
}

const findOneBoardId = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      // xử lý khi mà id không phải là ObjectId và là string thì có bước này sẽ đổi thành ObjectId
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneBoardId,
  getDetails
}