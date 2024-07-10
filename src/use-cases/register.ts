import { any, z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/prisma/user-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {

    constructor(private usersRepository: UsersRepository){
    }

    async execute({ name, email, password}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> { //aqui nos temos o metodo execute que cria um user 

        const password_hash = await hash(password, 6); //fazendo o hashing 
    
        const EmailExisting = await this.usersRepository.findByEmail(email)

        if(EmailExisting){
            throw new Error('Email Already Exists');
        }
    
       const user = await this.usersRepository.create({
            name, 
            email,
            password_hash
        })

        return { user }
        //esses parametros(name, email e password_hash serão passados no data para criar o user no repositories do user)
    }
    
}
 
