import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { pollRoutes } from './routes/poll'
import { userRoutes } from './routes/user'

async function bootstrap() {
  const PORT = 3333

  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: 'secret_key',
  })

  fastify.register(authRoutes)
  fastify.register(gameRoutes)
  fastify.register(guessRoutes)
  fastify.register(pollRoutes)
  fastify.register(userRoutes)

  await fastify.listen({ port: PORT, host: '0.0.0.0' })
}

bootstrap()
