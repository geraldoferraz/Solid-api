import { SearchGymUseCase } from "../serch-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchGymUseCase(gymsRepository); 

    return useCase
}