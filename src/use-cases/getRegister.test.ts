import { test, expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { GetRegisterUseCase } from './getRegister'
import { PrismaGetUsersRepository } from '@/repositories/prisma/prisma-getUsers-repository'
import { any, string } from 'zod'


describe('Get register use case', () => {
    it('Should be able to get register with id', async () => {
        const getUsersRepository = new PrismaGetUsersRepository()
        const getRegisterUseCase = new GetRegisterUseCase(getUsersRepository)

        const user = await getRegisterUseCase.executeExplorer({
            id: '6fac0c1a-34e5-42f0-95e0-6f93b4239c08'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should be able to get all registers', async () => {
        const getUsersRepository = new PrismaGetUsersRepository()
        const getRegisterUseCase = new GetRegisterUseCase(getUsersRepository)

        const users = await getRegisterUseCase.executeExplorerForAllUsers()

        expect(Array.isArray(users)).toBe(true);
    })

    it('Should be able to get register with email', async () => {
        const getUsersRepository = new PrismaGetUsersRepository()
        const getRegisterUseCase = new GetRegisterUseCase(getUsersRepository)

        const user = await getRegisterUseCase.executeExplorerByEmail({
            email: 'geraldo.ferraz@dreamxp.com'
        })

        expect(user.email).toEqual(expect.any(String))
    })
})

