import express from 'express'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const Router = express.Router()

Router.route('/')
  .post(columnValidation.createNew, columnController.createNew)

// Router.route('/:id')
//   .get(columnController.getDetails)
//   .put()

export const columnRoute = Router