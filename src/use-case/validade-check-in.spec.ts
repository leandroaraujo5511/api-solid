import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepositories } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInRepository: InMemoryCheckInsRepositories
let sut: ValidateCheckInUseCase

describe('Validate check in Use Case', async () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepositories()
    sut = new ValidateCheckInUseCase(checkInRepository)

    // vi.useFakeTimers()
  })

  //   afterEach(() => {
  //     vi.useRealTimers()
  //   })
  it('should be able to validate the check-in', async () => {
    const createdCheckin = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckin.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
