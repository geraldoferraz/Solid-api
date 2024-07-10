import { Prisma, User } from "@prisma/client";
import { GetUsersRepository } from "../prisma/getUser-repository";

export class InMemoryGetUsersRepository implements GetUsersRepository {
    public items: User[] = []

    async findById(id: string): Promise<User | null>{
      const user = this.items.find(item => item.id === id)

      if(!user){
        return null
      }

      return user
    }

    async findAll(): Promise<User[]>{
        const users = this.items; 

        return users; 
    }

    async findByEmail(email: string): Promise<User | null>{

        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }

}
