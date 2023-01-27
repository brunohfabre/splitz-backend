import { Request, Response } from 'express'

import { AppError } from '../errors/AppError'
import { prisma } from '../prisma'

export class InvitesController {
  static async index(request: Request, response: Response) {
    const { userId } = request

    const invites = await prisma.friend.findMany({
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
            accepted_at: null,
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

    return response.json({ invites })
  }

  static async update(request: Request, response: Response) {
    const { userId } = request
    const { id } = request.params

    const inviteExists = await prisma.friend.findFirst({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
        AND: [{ id, accepted_at: null }],
      },
    })

    if (!inviteExists) {
      throw new AppError('Invitation do not exists.')
    }

    await prisma.friend.update({
      where: {
        id: inviteExists.id,
      },
      data: {
        accepted_at: new Date(),
      },
    })

    return response.sendStatus(200)
  }

  static async delete(request: Request, response: Response) {
    const { userId } = request
    const { id } = request.params

    const inviteExists = await prisma.friend.findFirst({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
        AND: [{ id, accepted_at: null }],
      },
    })

    if (!inviteExists) {
      throw new AppError('Invitation do not exists.')
    }

    await prisma.friend.delete({
      where: {
        id: inviteExists.id,
      },
    })

    return response.sendStatus(200)
  }
}
