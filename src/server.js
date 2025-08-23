/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { API_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()
  // Enable req.body json data
  app.use(express.json())

  app.use(cors(corsOptions))
  // Use APIs V1
  app.use('/v1', API_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.get('/', (req, res) => {
    res.end('<h1>Hello World 12!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${process.env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/v1/status`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB cloud atlas')
  })
}

// Immediately-invaked / Anonymous Async Funtions(IIFE)
(async () => {
  try {
    console.log('1. Connecting to MogoDB Cloud atlas...')
    await CONNECT_DB()
    console.log('2. Connect to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// console.log('1. Connecting to MogoDB Cloud atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connect to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
