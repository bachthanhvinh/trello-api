/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // gọi  tới tầng Model để xử lý lưu bản ghi newBoard vao trong Database
    const createBoard = await boardModel.createNew(newBoard)
    // lấy bản khi board sau ghi gọi
    const getNewBoard = await boardModel.findOneBoardId(createBoard.insertedId)
    return getNewBoard
  } catch (error) { throw error }
}
const getDetails= async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'NOT FOUND')
    }
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}