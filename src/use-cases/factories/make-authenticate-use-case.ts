import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AutheticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase(){
    const UsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AutheticateUseCase(UsersRepository); 

    return authenticateUseCase
}