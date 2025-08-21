import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // trả kết quả về trong service luôn phải có return
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}