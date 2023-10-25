import { Consultancy } from '@prisma/client'
import { ConsultancyRepository } from '@/repositories/consultancy-repositorys'
import { ConsultancyAlreadyExistsError } from '../errors/consultancy-already-exists-error'

interface CreateConsultancyUseCaseRequest {
  id: string
  code: string
  name: string
  domain: string
  pathLogo?: string
}
interface CreateConsultancyUserCaseResponse {
  consultancy: Consultancy
}
export class CreateConsultancyUseCase {
  constructor(private consultancyRepository: ConsultancyRepository) {}

  async execute({
    id,
    code,
    domain,
    name,
    pathLogo,
  }: CreateConsultancyUseCaseRequest): Promise<CreateConsultancyUserCaseResponse> {
    const userWithSameCode = await this.consultancyRepository.findByCode(code)

    if (userWithSameCode) {
      throw new ConsultancyAlreadyExistsError()
    }
    const consultancy = await this.consultancyRepository.create({
      id,
      code,
      domain,
      name,
      pathLogo,
    })

    return {
      consultancy,
    }
  }
}
