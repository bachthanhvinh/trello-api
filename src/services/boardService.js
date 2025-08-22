import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // gọi  tới tầng Model để xử lý lưu bản ghi newBoard vao trong Database
    const createBoard = await boardModel.createNew(newBoard)
    // lấy bản khi board sau ghi gọi
    const getNewBoard = await boardModel.findOneBoardId(createBoard.insertedId.toString())
    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}