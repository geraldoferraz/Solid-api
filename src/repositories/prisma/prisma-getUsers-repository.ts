import { prisma } from "@/lib/prisma";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { UsersRepository } from "./user-repository";
import { GetUsersRepository } from "./getUser-repository";

export class PrismaGetUsersRepository implements GetUsersRepository{ //tudo oque tem ligacao com om banco

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    async findAll(){
        const users = await prisma.user.findMany();
        return users
    }

    async findByEmail(email: string){

        const UserWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        console.log('email user', UserWithEmail); 
        return UserWithEmail; 
    }

}