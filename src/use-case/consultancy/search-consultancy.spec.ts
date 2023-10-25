import { InMemoryConsultancyRepositories } from '@/repositories/in-memory/in-memory-consultancy-repositories'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchConsultancyUseCase } from './search-consultancy'

let consultancyRepository: InMemoryConsultancyRepositories
let sut: SearchConsultancyUseCase

describe('Search Consultancy Use Case', async () => {
  beforeEach(async () => {
    consultancyRepository = new InMemoryConsultancyRepositories()
    sut = new SearchConsultancyUseCase(consultancyRepository)
  })

  it('should be able to search for consultancy', async () => {
    await consultancyRepository.create({
      code: 'M3D1C',
      name: 'Medical',
      domain: '@medical.com.br',
      pathLogo: './logo.png',
    })

    const { consultancy } = await sut.execute({
      query: 'M3D1C',
    })

    expect(consultancy).toEqual(expect.objectContaining({ name: 'Medical' }))
  })
})
