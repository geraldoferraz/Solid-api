import { test, expect, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'


describe('Create gym use case', () => {
    it('Should be able to create a gym', async () => {
        const gymsRepository = new InMemoryGymsRepository()
        const createGymUseCase = new CreateGymUseCase(gymsRepository)

        const { gym } = await createGymUseCase.execute({
            title: 'SmartFit Settúbal',
            description: 'A melhor academia da cidade',
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })

        expect(gym.id).toEqual(expect.any(String))
        expect(gym.title).toEqual(expect.any(String))
    })

    it('Should not be able to create a gym', async () => {
        const gymsRepository = new InMemoryGymsRepository()
        const createGymUseCase = new CreateGymUseCase(gymsRepository)


        await expect(() =>  createGymUseCase.execute({
            title: '',
            description: 'A melhor academia da cidade',
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        })).rejects.toThrow('Error: Invalid title for gym')
    })
})

