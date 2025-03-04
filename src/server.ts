import fastify from 'fastify'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.addHook('preHandler', async (request) => {
  console.log(`${request.method} ${request.url}`)
})

app.register(cookie)

// Plug-in
app.register(transactionRoutes, {
  prefix: '/transactions',
})

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
