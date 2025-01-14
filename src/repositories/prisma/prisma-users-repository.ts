import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "./user-repository";

export class PrismaUsersRepository implements UsersRepository { //tudo oque tem ligacao com om banco

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    async findByEmail(email: string) {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        }) 
    
        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data, 
        })

        return user
    }
}
