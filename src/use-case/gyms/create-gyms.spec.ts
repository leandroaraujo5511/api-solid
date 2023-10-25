import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repositories'
import { CreateGymUseCase } from './created-gym'

let gymsRepository: InMemoryGymsRepositories
let sut: CreateGymUseCase

describe('Create Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia 01',
      description: null,
      phone: null,
      latitude: -23.6364337,
      longitude: -46.6415725,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
