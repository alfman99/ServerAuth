import Fastify from 'fastify'

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true
})


// Declare route
fastify.get('/', async (request: any, reply) => {
  return { hello: 'world' }
})


// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})