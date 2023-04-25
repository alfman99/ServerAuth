import Fastify from 'fastify'
import addHWID from './routes/addHWID'
import auth from './routes/auth'
import registerProject from './routes/registerProject'


// Initialize dotenv
import dotenv from 'dotenv'
dotenv.config()

import db from './db/access'
db.sync();

// Instantiate Fastify with some config
const fastify = Fastify()


// Route to register a new project
fastify.get('/api/registerProject', registerProject)
// Route to add a HWID to a project
fastify.get('/api/addHWID', addHWID)
// Route to check auth
fastify.get('/api/auth', auth)


// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
