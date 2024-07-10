import { test, expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { any, string } from 'zod'
import { AutheticateUseCase } from './authenticate'


describe('Authenticate use case', () => {
    it('Should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AutheticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Geraldo Ferraz',
            email: 'geraldoferraz@gmail.com',
            password_hash: await hash('gera12234', 6)
        })

        const { user } = await authenticateUseCase.execute({
            email: 'geraldoferraz@gmail.com',
            password: 'gera12234'
        })

        expect(user.email).toEqual(expect.any(String))
        expect(user.password_hash).toEqual(expect.any(String))
    })

    it('Should not e able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AutheticateUseCase(usersRepository)

        await expect(() => authenticateUseCase.execute({
            email: 'geraldoferraz@gmail.com',
            password: 'gera12234'
        })).rejects.toThrow('Error: User Not Found!')
    })

    it('Should not e able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AutheticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Geraldo Ferraz',
            email: 'geraldoferraz@gmail.com',
            password_hash: await hash('gera12234', 6)
        })

        await expect(() => authenticateUseCase.execute({
            email: 'geraldoferraz@gmail.com',
            password: '12345'
        })).rejects.toThrow('Error: Senha Incorreta, tente novamente mais tarde.')
    })
})

