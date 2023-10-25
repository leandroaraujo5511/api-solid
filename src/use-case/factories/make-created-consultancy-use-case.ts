import { PrismaConsultancyRepository } from '@/repositories/prisma/prisma-consultancys-repository'
import { CreateConsultancyUseCase } from '../consultancy/created-consultacy'

export function makeCreatedConsultancyUseCase() {
  const consultancyRepository = new PrismaConsultancyRepository()
  const useCase = new CreateConsultancyUseCase(consultancyRepository)

  return useCase
}
