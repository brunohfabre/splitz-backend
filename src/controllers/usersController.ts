import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

import { authConfig } from '../config/authConfig'
import { AppError } from '../errors/AppError'
import { prisma } from '../prisma'

export class UsersController {
  static async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new AppError('Email already in use.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    const { id } = user

    const userWithoutPassword = {
      id,
      name,
      email,
    }

    return response.json({
      user: userWithoutPassword,
      token,
    })
  }
}
