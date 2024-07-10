import { test, expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AutheticateUseCase } from './authenticate'
import { GetUserProfileUseCase } from './getUserProfile'


describe('Authenticate use case', () => {
    it('Should be able to get user profile', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

        const createdUser = await usersRepository.create({
            name: 'Geraldo Ferraz',
            email: 'geraldoferraz@gmail.com',
            password_hash: await hash('gera12234', 6)
        })

        const { user } = await getUserProfileUseCase.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual(expect.any(String))
    })

    it('Should not be able to get user profile with wrong id', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

        await expect(() => getUserProfileUseCase.execute({
            userId: 'non-existing-id'
        })).rejects.toThrow('Error: User Not Found!')
    })
})

