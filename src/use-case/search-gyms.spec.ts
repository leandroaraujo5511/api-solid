import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repositories'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepositories
let sut: SearchGymUseCase

describe('Search Gyms Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepositories()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript GYM',
      description: null,
      phone: null,
      latitude: -23.6364337,
      longitude: -46.6415725,
    })
    await gymsRepository.create({
      title: 'TypeScript GYM',
      description: null,
      phone: null,
      latitude: -23.6364337,
      longitude: -46.6415725,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript GYM' })])
  })
  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript GYM ${i}`,
        description: null,
        phone: null,
        latitude: -23.6364337,
        longitude: -46.6415725,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript GYM 21' }),
      expect.objectContaining({ title: 'JavaScript GYM 22' }),
    ])
  })
})
