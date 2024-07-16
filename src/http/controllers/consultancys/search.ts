import { makeSearchConsultancyUseCase } from '@/use-case/factories/make-search-consultancy-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchConsultancyQuerySchema = z.object({
    q: z.string(),
  })
  const { q } = searchConsultancyQuerySchema.parse(request.query)

  const searchUseCase = makeSearchConsultancyUseCase()
  try {
    const result = await searchUseCase.execute({
      query: q,
    })
    if (result.consultancy) {
      return reply.status(200).send({
        consultancy: result.consultancy,
      })
    } else {
      return reply.status(404).send({
        error: 'Consultancy not found',
      })
    }
  } catch (error) {
    return reply.status(400).send({
      error,
    })
  }
}
