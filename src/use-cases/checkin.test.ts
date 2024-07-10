import { test, expect, describe, it, vi, afterEach, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUseCase } from './checkin'
import { string } from 'zod'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let checkinUseCase: CheckinUseCase


describe('Checkin use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymsRepository = new InMemoryGymsRepository();
        checkinUseCase = new CheckinUseCase(checkInRepository, gymsRepository);

        gymsRepository.create({
            id: 'gym-01',
            title: 'JS ACADEMY',
            description: 'Academia para alunos amantes do js',
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091
        })
        
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to Checkin', async () => {

        const { checkIn } = await checkinUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await checkinUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(() => checkinUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toThrow()

    })


    it('Should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

        await checkinUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        vi.setSystemTime(new Date(2023, 0, 21, 7, 0, 0));

        const { checkIn } = await checkinUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        })

        expect(checkIn.user_id).toEqual(expect.any(String))

    })

    it('should not be possible to check in to a gym that doesnt exist ', async () => {

        expect(() => checkinUseCase.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toThrow('Error: Gym not Found')

    })

    it('Should not be able to Check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JS ACADEMY',
            description: 'Academia para alunos amantes do js',
            phone: '',
            latitude: new Decimal(-27.0747279),
            longitude: new Decimal(-49.4889672)
        });
    
        await expect(checkinUseCase.execute({
            gymId: 'gym-02', 
            userId: 'user-01',
            userLatitude: -27.2092052, 
            userLongitude: -49.6401091
        })).rejects.toThrow('Error: Invalid Checkin');
    });

})

