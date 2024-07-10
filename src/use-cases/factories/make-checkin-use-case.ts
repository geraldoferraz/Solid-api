import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { CheckinUseCase } from "../checkin";

export function makeCheckinUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckinUseCase(checkinsRepository, gymsRepository); 

    return useCase
}