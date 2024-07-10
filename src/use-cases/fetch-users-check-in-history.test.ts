import {  expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUsersCheckInHistoryUseCase } from './fetch-users-check-in-history'

let checkInRepository: InMemoryCheckInRepository
let fetchUserCheckInsHistoryUseCase: FetchUsersCheckInHistoryUseCase


describe('Fetch user checkin history use case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        fetchUserCheckInsHistoryUseCase = new FetchUsersCheckInHistoryUseCase(checkInRepository)
        
    });

    it('Should be able to fetch checkin history ', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01'}),
            expect.objectContaining({ gym_id: 'gym-02'}),
        ])
    })

    it('Should be able to fetch paginated check-in history ', async () => {

        for(let i= 1; i <= 22; i++){
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
            userId: 'user-01',
            page: 2
        })


        console.log(checkIns)

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21'}),
            expect.objectContaining({ gym_id: 'gym-22'}),
        ])
    })

    it('Should not be able to fetch checkin history ', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
            userId: 'user-02',
            page: 1
        })

        expect(checkIns).toHaveLength(0);
    })

})

