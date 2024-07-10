import { any, z } from "zod";
import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/prisma/user-repository";
import { GetUsersRepository } from "@/repositories/prisma/getUser-repository";
import { error } from "console";

interface GetRegisterUseCaseRequest {
    id: string
}

interface GetRegisterUseCaseRequestWithEmail {
    email: string
}

export class GetRegisterUseCase {

    constructor(private getUsersRepository: GetUsersRepository){
    }

    async executeExplorer({ id }: GetRegisterUseCaseRequest) { //aqui nos temos o metodo execute que cria um user 

        const userExisting = await this.getUsersRepository.findById(id); 

        if(!userExisting){
            throw new Error('User not found');
        }

        return userExisting;
    }

    async executeExplorerForAllUsers(){

        const users = await this.getUsersRepository.findAll(); 

        if(!users){
            throw new Error('No users found.')
        }

        return users;
    }


    async executeExplorerByEmail({ email }: GetRegisterUseCaseRequestWithEmail){

        const userWithEmail = await this.getUsersRepository.findByEmail(email); 

        if(!userWithEmail){
            throw new Error('No users found.')
        }

        console.log('all user with this email', userWithEmail)
        return userWithEmail
    }
    
}
 