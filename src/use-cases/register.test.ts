import { test, expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { any, string } from 'zod'


describe('Register use case', () => {
    it('Should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Geraldo Ferraz', 
            email: 'geraldoferraz@gmail.com.br',
            password: 'gera123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            'gera123456',
            user.password_hash
        )

        expect(user.id).toEqual(expect.any(String))
        expect(user.email).toEqual(expect.any(String))
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should hash user password upon registration', async () => {
        // const prismaUsersRepository = new PrismaUsersRepository()
        // const registerUseCase = new RegisterUseCase(prismaUsersRepository)// se essa parte estivesse rodando, nos estariamos testando com op banco de dados 
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Geraldo Ferraz', 
            email: 'geraldoferraz@gmail.com.br',
            password: 'gera123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            'gera123456', 
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const emailDuplicated = 'geraldoferraz@gmail.com.br'

        await registerUseCase.execute({
            name: 'Geraldo Ferraz', 
            email: emailDuplicated, 
            password: 'gera123456'
        })

        await expect(registerUseCase.execute({ //nos esperamos que quando esse metodo for executado pela 2 vez, de erro e o erro seja == Email Already Exists
            name: 'Geraldo Ferraz', 
            email: emailDuplicated, 
            password: 'gera123456'
        })).rejects.toThrow('Email Already Exists');
    })
})

