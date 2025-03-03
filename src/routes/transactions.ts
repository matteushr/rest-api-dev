import fastify, { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export function transactionRoutes(app: FastifyInstance) {
  app.get('/transactions', async () => {
    const transaction = await knex('transactions').select()

    return {
      transaction,
    }
  })

  app.get('/transactions/:id', async (request, reply) => {
    const uuidSchema = z.object({
      id: z.string().uuid({ message: "Invalid UUID format" })
    })

    try {
      const { id } = uuidSchema.parse(request.params)
      
      const transaction = await knex('transactions')
        .where("id", id)
        .first()

      if (!transaction) {
        return reply.status(404).send({
          statusCode: 404,
          error: "Not Found",
          message: "Transaction not found"
        })
      }

      return reply.send({
        statusCode: 200,
        data: transaction
      })

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          error: "Bad Request",
          message: error.errors.map(e => e.message)
        })
      }
      
      return reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error"
      })
    }
  })

  app.post('/', async (request, reply) => {
    const transactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const body = transactionSchema.parse(request.body)

    const { title, amount, type } = body

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      type,
    })

    return reply.status(201).send()
  })
}
