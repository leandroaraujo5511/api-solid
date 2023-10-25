import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepositories } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepositories
let sut: GetUserMetricsUseCase

describe('Get User Metric Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepositories()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check-in count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInCount).toEqual(2)
  })
})
