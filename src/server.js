/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
const START_SERVER = () => {
  const app = express()

  // const hostname = 'localhost'
  // const port = 8017

  app.get('/', async (req, res) => {
    // process.exit(0)
    res.end('<h1>Hello World 12!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${process.env.AUTHOR}, I am running at http://${env.APP_PORT}:${env.APP_HOST}/`)
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
