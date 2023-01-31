import { Request, Response } from 'express'

import { prisma } from '../prisma'

export class BillsController {
  static async create(request: Request, response: Response) {
    const { userId } = request
    const { name, totalValue, users } = request.body

    const total_value = totalValue * 100

    const usersToSplit = [...users, userId]

    const value = total_value / usersToSplit.length

    const bill = await prisma.bill.create({
      data: {
        name,
        owner_id: userId,
        total_value,
        billUsers: {
          create: usersToSplit.map((userId) => ({
            user_id: userId,
            value,
          })),
        },
      },
    })

    return response.json({
      bill,
    })
  }
}
