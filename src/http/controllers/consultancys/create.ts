import { ConsultancyAlreadyExistsError } from '@/use-case/errors/consultancy-already-exists-error'
import { makeCreatedConsultancyUseCase } from '@/use-case/factories/make-created-consultancy-use-case'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createConsultancyBodySchema = z.object({
    code: z.string().length(5),
    name: z.string(),
    domain: z.string(),
    pathLogo: z.string(),
  })

  const { code, domain, name, pathLogo } = createConsultancyBodySchema.parse(
    request.body,
  )

  try {
    const createUseCase = makeCreatedConsultancyUseCase()
    await createUseCase.execute({
      id: randomUUID(),
      code,
      domain,
      name,
      pathLogo,
    })
  } catch (error) {
    if (error instanceof ConsultancyAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
  return reply.status(201).send()
}
