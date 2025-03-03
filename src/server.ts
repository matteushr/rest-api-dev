import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.register(transactionRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Active: http://localhost:${env.PORT}`)
  })
  .catch((err) => {
    console.log('Error on server start:', err)
  })
