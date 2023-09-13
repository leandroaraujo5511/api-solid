import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repositorys'

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
