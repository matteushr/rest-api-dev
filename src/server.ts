import fastify from 'fastify'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/hello', async () => {
  return await webhook
    .then((message: unknown) => {
      return message + ' - ' + new Date().toISOString()
    })
    .catch((error: unknown) => {
      return error
    })
})

const webhook = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Webhook recebido com sucesso!')
  }, 1000)
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server currently active.')
  })
