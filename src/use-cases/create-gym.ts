import { hash } from "bcryptjs";
import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string,
    description?: string | null
    phone: string | null
    latitude: number
    longitude: number 
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {

    constructor(private gymsRepository: GymsRepository){
    }

    async execute({title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> { //aqui nos temos o metodo execute que cria um user 

        if(!title){
            throw new Error('Error: Invalid title for gym')
        }
    
       const gym = await this.gymsRepository.create({
        title, 
        description,
        phone,
        latitude,
        longitude

        })

        return { gym }
    }
    
}
 
