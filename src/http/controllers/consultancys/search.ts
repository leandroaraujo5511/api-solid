import { makeSearchConsultancyUseCase } from '@/use-case/factories/make-search-consultancy-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchConsultancyQuerySchema = z.object({
    q: z.string(),
  })
  const { q } = searchConsultancyQuerySchema.parse(request.query)

  const searchUseCase = makeSearchConsultancyUseCase()
  const { consultancy } = await searchUseCase.execute({
    query: q,
  })

  return reply.status(200).send({
    consultancy,
  })
}
