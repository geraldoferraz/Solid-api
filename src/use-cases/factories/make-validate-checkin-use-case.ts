import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { ValidateCheckinUseCase } from "../validate-checkin";

export function makeValidateCheckinUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckinUseCase(checkinsRepository); 

    return useCase
}