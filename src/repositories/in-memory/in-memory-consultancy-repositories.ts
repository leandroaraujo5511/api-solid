import { Consultancy, Prisma } from '@prisma/client'
import { ConsultancyRepository } from '../consultancy-repositorys'
import { randomUUID } from 'crypto'

export class InMemoryConsultancyRepositories implements ConsultancyRepository {
  public items: Consultancy[] = []

  async findById(id: string) {
    const consultancy = this.items.find((item) => item.id === id)

    if (!consultancy) {
      return null
    }
    return consultancy
  }

  async findByCode(code: string) {
    const consultancy = this.items.find((item) => item.code === code)

    if (!consultancy) {
      return null
    }
    return consultancy
  }

  async create(data: Prisma.ConsultancyCreateInput) {
    const consultancy = {
      id: data.id ?? randomUUID(),
      code: data.code,
      name: data.name,
      domain: data.domain,
      pathLogo: data.pathLogo ?? '',
    }
    this.items.push(consultancy)
    return consultancy
  }
}
