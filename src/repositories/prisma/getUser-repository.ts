import { User } from "@prisma/client";

export interface GetUsersRepository{
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]> | null
    findByEmail(email: string): Promise<User | null>
}