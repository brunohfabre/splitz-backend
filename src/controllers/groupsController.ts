import { Request, Response } from 'express'

import { prisma } from '../prisma'

export class GroupsController {
  static async index(request: Request, response: Response) {
    const { userId } = request

    const groups = await prisma.group.findMany({
      where: {
        owner_id: userId,
      },
    })

    return response.json({ groups })
  }
}
