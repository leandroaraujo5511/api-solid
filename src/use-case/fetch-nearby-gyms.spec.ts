import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repositories'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepositories
let sut: FetchNearbyUseCase

describe('Fetch Nearby Gyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near GYM',
      description: null,
      phone: null,
      latitude: -23.6364337,
      longitude: -46.6415725,
    })
    await gymsRepository.create({
      title: 'Far GYM',
      description: null,
      phone: null,
      latitude: -20.5675513,
      longitude: -47.3496385,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.6364337,
      userLongitude: -46.6415725,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near GYM' })])
  })
})
