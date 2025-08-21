import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    // console.log('res.body:', req.body)
    // console.log('res.query:', req.query)
    // console.log('req.params:', req.params)
    // console.log('req.files:', req.files)
    // console.log('req.cookies:', req.cookies)
    // console.log('req.jwtDecoded:', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service

    // Có kết quả thì trả về phía Clinet
    res.status(StatusCodes.CREATED).json({ message: 'Post: API Create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}