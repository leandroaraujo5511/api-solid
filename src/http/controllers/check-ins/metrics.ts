import { makeGetUserMetricUseCase } from '@/use-case/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserCheckInMetricsUseCase = makeGetUserMetricUseCase()

  const { checkInCount } = await getUserCheckInMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInCount,
  })
}
