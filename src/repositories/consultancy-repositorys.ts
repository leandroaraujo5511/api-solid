import { Consultancy, Prisma } from '@prisma/client'

export interface ConsultancyRepository {
  create(data: Prisma.ConsultancyCreateInput): Promise<Consultancy>
  findByCode(id: string): Promise<Consultancy | null>
  // findById(id: string): Promise<Consultancy | null>
}
