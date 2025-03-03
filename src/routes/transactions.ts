import fastify, { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { request } from "node:http";

export function transactionRoutes(app: FastifyInstance) {
    app.get('/transactions', async () => {
        const transaction = await knex('transactions').select()
      
        return {

            transaction,
        }
      })

      app.get('/transactions/:id', async (request, reply) => {
        const getTransactionsParamSchema = z.object({
            id: z.string().uuid(),

                
        })

        const { id } = getTransactionsParamSchema.parse(request.params)

        const transaction = await knex('transactions').where("id", id).first()

        const httpCode = transaction ? 200 : 404
        
        return reply.status(httpCode).send({
            statusCode: httpCode,
            data: transaction || { message: "Transaction not found" }
        })


      })

      app.post("/", async (request, reply) => {

        const transactionSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const body = transactionSchema.parse(request.body)

        const {title, amount, type} = body

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            type,
        })

        return reply.status(201).send()


      })
}