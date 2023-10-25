import { Prisma } from '@prisma/client'
import { ConsultancyRepository } from '../consultancy-repositorys'
import { prisma } from '@/lib/prisma'

export class PrismaConsultancyRepository implements ConsultancyRepository {
  async findByCode(code: string) {
    const consultancy = await prisma.consultancy.findUnique({
      where: {
        code,
      },
    })
    return consultancy
  }

  async create(data: Prisma.ConsultancyCreateInput) {
    const consultancy = await prisma.consultancy.create({
      data,
    })
    return consultancy
  }
}
