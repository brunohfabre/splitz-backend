import 'dotenv/config'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import 'express-async-errors'

import { AppError } from './errors/AppError'
import { AuthError } from './errors/AuthError'
import { routes } from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',

      message: err.message,
    })
  }

  if (err instanceof AuthError) {
    return response.status(err.statusCode).json({
      status: 'auth_error',

      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',

    message: 'Internal server error.',
  })
})

app.listen(process.env.PORT, () =>
  console.log('🚀 Server running on port 3333.'),
)
