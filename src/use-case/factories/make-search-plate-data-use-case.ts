import { PrismaPlateDataRepository } from '@/repositories/prisma/prisma-plates-data-repository'
import { SearchConsultancyUseCase } from '../consultancy/search-consultancy'

export function makeSearchPlateDataUseCase() {
  const plateDataRepository = new PrismaPlateDataRepository()
  const useCase = new SearchConsultancyUseCase(plateDataRepository)

  return useCase
}
