import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../getUserProfile";

export function makeGetUserProfileUseCase(){
    const UsersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(UsersRepository); 

    return useCase
}