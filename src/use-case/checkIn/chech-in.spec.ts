import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepositories } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepositories } from '@/repositories/in-memory/in-memory-gyms-repositories'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/max-number-off-check-ins-error'
import { MaxDistanceError } from '../errors/max-distance-error'

let usersRepository: InMemoryCheckInsRepositories
let gymsRepository: InMemoryGymsRepositories
let sut: CheckInUseCase

describe('Register Use Case', async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryCheckInsRepositories()
    gymsRepository = new InMemoryGymsRepositories()
    sut = new CheckInUseCase(usersRepository, gymsRepository)

    await gymsRepository.create({
      title: 'Academia 01',
      id: 'gym-01',
      description: '',
      phone: '',
      latitude: -23.6364337,
      longitude: -46.6415725,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.6364337,
      userLongitude: -46.6415725,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twist in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.6364337,
      userLongitude: -46.6415725,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.6364337,
        userLongitude: -46.6415725,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twist in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.6364337,
      userLongitude: -46.6415725,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.6364337,
      userLongitude: -46.6415725,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distance gym', async () => {
    gymsRepository.items.push({
      title: 'Academia 02',
      id: 'gym-02',
      description: '',
      phone: '',
      latitude: new Decimal(-20.5690804),
      longitude: new Decimal(-47.3504978),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.6364337,
        userLongitude: -46.6415725,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
