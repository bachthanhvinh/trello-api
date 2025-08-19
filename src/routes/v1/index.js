import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from './boardRoute'
const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.', code: StatusCodes.OK })
})

Router.use('/boards', boardRouter)

export const API_V1 = Router