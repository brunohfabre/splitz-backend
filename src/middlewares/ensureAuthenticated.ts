import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { authConfig } from '../config/authConfig'
import { AuthError } from '../errors/AuthError'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AuthError('JWT token is missing.')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.userId = sub

    return next()
  } catch (err) {
    throw new AuthError('Invalid JWT token.')
  }
}
