import { UsersRepository } from "@/repositories/prisma/user-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AutheticateUseCaseRequest {
    email: string,
    password: string
}

interface AutheticateUseCaseResponse {
    user: User
}

export class AutheticateUseCase {
    constructor(//dependecias que o caso de uso vai ter 
        private usersRepository: UsersRepository,
        ){}

        async execute({ email, password }: AutheticateUseCaseRequest): Promise<AutheticateUseCaseResponse>{
                const user = await this.usersRepository.findByEmail(email)

            if(!user){
                throw new Error('Error: User Not Found!')
            }

            const doesPasswordMatches = await compare(password, user.password_hash)

            if(!doesPasswordMatches){
                throw new Error('Error: Senha Incorreta, tente novamente mais tarde.')
            }
            return { user }
        }
}