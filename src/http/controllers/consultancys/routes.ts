import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'
import { search } from './search'

export async function consultancyRoutes(app: FastifyInstance) {
  app.get('/consultancy/search', search)
  app.addHook('onRequest', verifyJWT)

  app.post('/consultancy', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
