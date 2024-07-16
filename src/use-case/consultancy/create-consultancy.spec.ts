import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryConsultancyRepositories } from '@/repositories/in-memory/in-memory-consultancy-repositories'
import { CreateConsultancyUseCase } from './created-consultacy'

let consultancyRepository: InMemoryConsultancyRepositories
let sut: CreateConsultancyUseCase

describe('Create Use Case', async () => {
  beforeEach(() => {
    consultancyRepository = new InMemoryConsultancyRepositories()
    sut = new CreateConsultancyUseCase(consultancyRepository)
  })
  it('should be able to create consultancy', async () => {
    const { consultancy } = await sut.execute({
      id: '01',
      code: 'M3D1C',
      name: 'Medical',
      domain: '@medical.com.br',
      pathLogo: '',
    })

    expect(consultancy.id).toEqual(expect.any(String))
  })
})
