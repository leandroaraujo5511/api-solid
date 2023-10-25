import { Consultancy } from '@prisma/client'
import { ConsultancyRepository } from '@/repositories/consultancy-repositorys'

interface SearchConsultancyUseCaseRequest {
  query: string
}
interface SearchConsultancyUseCaseResponse {
  consultancy: Consultancy | null
}
export class SearchConsultancyUseCase {
  constructor(private consultancyRepository: ConsultancyRepository) {}

  async execute({
    query,
  }: SearchConsultancyUseCaseRequest): Promise<SearchConsultancyUseCaseResponse> {
    const consultancy = await this.consultancyRepository.findByCode(query)

    return {
      consultancy,
    }
  }
}
