import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIfExists } from '../middlewares/check-sessionId-exists'

export function transactionRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIfExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return reply.status(200).send({
        statusCode: 200,
        data: transactions,
      })
    },
  )

  // Get a transaction by id
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIfExists],
    },
    async (request, reply) => {
      const uuidSchema = z.object({
        id: z.string().uuid({ message: 'Invalid UUID format' }),
      })

      try {
        const { id } = uuidSchema.parse(request.params)

        const transaction = await knex('transactions').where('id', id).first()

        if (!transaction) {
          return reply.status(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: 'Transaction not found',
          })
        }

        return reply.send({
          statusCode: 200,
          data: transaction,
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: error.errors.map((e) => e.message),
          })
        }

        return reply.status(500).send({
          statusCode: 500,
          error: 'Internal Server Error',
        })
      }
    },
  )

  // Create a transaction
  app.post(
    '/',
    {
      preHandler: [checkSessionIfExists],
    },
    async (request, reply) => {
      const transactionSchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      const { title, amount, type } = transactionSchema.parse(request.body)

      const sessionId = request.cookies.sessionId

      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        type,
        session_id: sessionId,
      })

      return reply.status(201).send()
    },
  )

  // Get summary of transactions
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIfExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      const creditAmount = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .where('session_id', sessionId)
        .where('type', 'credit')
        .first()

      const debitAmount = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .where('session_id', sessionId)
        .where('type', 'debit')
        .first()

      return reply.status(200).send({
        statusCode: 200,
        summary: {
          total: summary?.amount,
          credit: creditAmount?.amount,
          debit: debitAmount?.amount,
        },
      })
    },
  )

  // Delete a transaction
  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIfExists],
    },
    async (request, reply) => {
      const uuidSchema = z.object({
        id: z.string().uuid(),
      })

      const { sessionId } = request.cookies
      const { id } = uuidSchema.parse(request.params)

      await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .delete()

      return reply.status(204).send()
    },
  )

  // Create a session
  app.post('/admin', async (request, reply) => {
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
    }

    reply.setCookie('sessionId', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return reply.status(201).send({
      statusCode: 201,
      sessionId,
    })
  })
}
