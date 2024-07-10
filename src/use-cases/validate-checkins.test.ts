import { test, expect, describe, it, vi, afterEach, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { ValidateCheckinUseCase } from './validate-checkin'

let checkInRepository: InMemoryCheckInRepository
let validateCheckinUseCase: ValidateCheckinUseCase


describe('Validate Checkin use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        validateCheckinUseCase = new ValidateCheckinUseCase(checkInRepository);
        
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to validate the Checkin', async () => {

        const CreatedcheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })
        
        await validateCheckinUseCase.execute({
            checkInId: CreatedcheckIn.id
        })

        expect(CreatedcheckIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('Should not be able to validate an inexistent Checkin', async () => {

       await expect(() => validateCheckinUseCase.execute({
            checkInId: 'inexisting-check-in-id',
        })).rejects.toThrowError('Error: CheckIn not Found')
    })

    it('Should not be able to validate the checkin after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const CreatedcheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => validateCheckinUseCase.execute({
            checkInId: CreatedcheckIn.id
        })).rejects.toThrowError('Error: The checkin can only be validated until 20 minutes of its creation.')
     })
})

