import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

import { authConfig } from '../config/authConfig'
import { AppError } from '../errors/AppError'
import { prisma } from '../prisma'

export class SessionsController {
  static async show(request: Request, response: Response) {
    const { userId } = request

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userExists) {
      throw new AppError('Incorret email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn,
    })

    const { id, name, email, bio, avatar_url } = userExists

    const user = {
      id,
      name,
      email,
      bio,
      avatarUrl: avatar_url,
    }

    return response.json({
      user,
      token,
    })
  }

  static async create(request: Request, response: Response) {
    const { email, password } = request.body

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!userExists) {
      throw new AppError('Incorret email/password combination.', 401)
    }

    if (!userExists.password) {
      throw new AppError(
        'This email is already being used to login with GitHub. Sign in with GitHub and add a password for this account.',
        401,
      )
    }

    const passwordMatched = await compare(password, userExists.password)

    if (!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn,
    })

    const { id, name, bio, avatar_url } = userExists

    const user = {
      id,
      name,
      email,
      bio,
      avatarUrl: avatar_url,
    }

    return response.json({
      user,
      token,
    })
  }
}
