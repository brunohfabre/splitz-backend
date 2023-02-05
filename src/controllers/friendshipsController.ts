import { Request, Response } from 'express'

import { AppError } from '../errors/AppError'
import { prisma } from '../prisma'

export class FriendshipsController {
  static async index(request: Request, response: Response) {
    const { userId } = request

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
        AND: [
          {
            accepted_at: {
              not: null,
            },
          },
        ],
      },
      select: {
        id: true,
        accepted_at: true,
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
          },
        },
      },
    })

    return response.json({ friendships })
  }

  static async create(request: Request, response: Response) {
    const { userId } = request
    const { email } = request.body

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!userExists) {
      throw new AppError(
        'The user who is trying to send an invitation does not exist',
      )
    }

    const friendExists = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
      },
    })

    if (friendExists) {
      throw new AppError('Friend already exists.')
    }

    const friendship = await prisma.friendship.create({
      data: {
        user_id: userId,
        friend_id: userExists.id,
      },
      select: {
        id: true,
        accepted_at: true,
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar_url: true,
          },
        },
      },
    })

    return response.json({ friendship })
  }

  static async delete(request: Request, response: Response) {
    const { userId } = request
    const { id } = request.params

    const friendExists = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
      },
    })

    if (!friendExists) {
      throw new AppError('Friend do not exists.')
    }

    await prisma.friendship.delete({
      where: {
        id,
      },
    })

    return response.sendStatus(204)
  }
}
