import { PrismaConsultancyRepository } from '@/repositories/prisma/prisma-consultancys-repository'
import { SearchConsultancyUseCase } from '../consultancy/search-consultancy'

export function makeSearchConsultancyUseCase() {
  const consultancyRepository = new PrismaConsultancyRepository()
  const useCase = new SearchConsultancyUseCase(consultancyRepository)

  return useCase
}
