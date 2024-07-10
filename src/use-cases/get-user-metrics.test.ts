import {  expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { FetchUsersCheckInHistoryUseCase } from './fetch-users-check-in-history'
import { GetUsersMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let getUsersMetricsUseCase: GetUsersMetricsUseCase


describe('Get users metrics use case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        getUsersMetricsUseCase = new GetUsersMetricsUseCase(checkInRepository)
    });

    it('Should be able to get checkins count from metrics', async () => {

        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkInsCount } = await getUsersMetricsUseCase.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2);
    })

})

