import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/users', async () => {
  const transactions = await knex('transactions')
    .where('amount', 5000)
    .select('*')

  return transactions
})

app
  .listen({
    port: Number(process.env.PORT),
  })
  .then(() => {
    console.log(`Active: http://localhost:${process.env.PORT}`)
  })
  .catch((err) => {
    console.log('Error on server start:', err)
  })
