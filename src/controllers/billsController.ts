import { Request, Response } from 'express'

import { prisma } from '../prisma'

export class BillsController {
  static async index(request: Request, response: Response) {
    const { userId } = request

    const bills = await prisma.bill.findMany({
      where: {
        OR: [
          {
            owner_id: userId,
          },
          {
            billUsers: {
              some: {
                user_id: userId,
              },
            },
          },
        ],
      },
    })

    return response.json({ bills })
  }

  static async create(request: Request, response: Response) {
    const { userId, file } = request
    const { name, value, type, friends } = request.body

    const total_value = value * 100

    const usersToSplit = friends?.length ? [...friends, userId] : []

    const valuePerFriend = total_value / usersToSplit.length

    const bill = await prisma.bill.create({
      data: {
        name,
        owner_id: userId,
        total_value,
        type,
        invoice_url: file?.filename,
        billUsers: {
          create: usersToSplit.map((userId) => ({
            value: valuePerFriend,
            user_id: userId,
          })),
        },
      },
    })

    return response.json({
      bill,
    })
  }
}
