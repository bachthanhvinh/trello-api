
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // gọi  tới tầng Model để xử lý lưu bản ghi newBoard vao trong Database
    const createBoard = await boardModel.createNew(newBoard)
    // lấy bản khi board sau ghi gọi
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails= async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'BOARD NOT FOUND')
    }

    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {

      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())

    })
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}


const update= async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }


    const result = await boardModel.update(boardId, updateData)
    return result
  } catch (error) { throw error}
}

const moveCardToDifferentColumn = async (reqBody) => {

  try {
    // coi cái này la xóa card vừa được kéo khỏi column
    await columnModel.update(reqBody.prevOldColumns, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // thêm card vừa kéo vào column
    await columnModel.update(reqBody.nextColumns, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // cập nhật lại columnId mới của card mà card mới chuyển qua
    await cardModel.update(reqBody.currentCard, {
      columnId: reqBody.nextColumns,
      updatedAt: Date.now()
    })

    return { resultData : 'Success' }
  } catch (error) { throw error}
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}