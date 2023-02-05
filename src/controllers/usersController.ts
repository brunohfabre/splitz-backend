import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import fs from 'node:fs'
import path from 'node:path'

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

    const { id, bio, avatar_url } = user

    const userWithoutPassword = {
      id,
      name,
      email,
      bio,
      avatarUrl: avatar_url,
    }

    return response.json({
      user: userWithoutPassword,
      token,
    })
  }

  static async updateAvatar(request: Request, response: Response) {
    const { userId, file } = request

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userExists) {
      throw new AppError('User do not exists.')
    }

    if (userExists.avatar_url && !userExists.avatar_url.includes('http')) {
      const fileDest = path.resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        'uploads',
        userExists.avatar_url,
      )

      const fileExists = fs.existsSync(fileDest)

      if (fileExists) {
        await fs.promises.unlink(fileDest)
      }
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar_url: file?.filename,
      },
    })

    const { id, name, email, bio } = userExists

    const user = {
      id,
      name,
      email,
      bio,
      avatarUrl: file?.filename,
    }

    return response.json({
      user,
    })
  }
}
