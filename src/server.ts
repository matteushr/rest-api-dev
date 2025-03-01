import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/hello', async () => {
  const test = await knex('sqlite_schema').select('*')
  return test
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server currently active.')
  })
  .catch((err) => {
    console.log('Error on server start:', err)
  })
