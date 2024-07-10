import { UsersRepository } from "@/repositories/prisma/user-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface GetUserProfileUseCaseRequest {   
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository){}

        async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
            const user = await this.usersRepository.findById(userId)

            if(!user){
                throw new Error('Error: User Not Found!')
            }

            return { user }
        }
}