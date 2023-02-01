import { Request, Response } from 'express'

import { prisma } from '../prisma'

export class SplitsController {
  static async index(request: Request, response: Response) {
    const { userId } = request

    const splits = await prisma.billUser.findMany({
      where: {
        user_id: userId,
      },
      include: {
        bill: {
          include: {
            _count: true,
          },
        },
      },
    })

    return response.json({ splits })
  }
}
