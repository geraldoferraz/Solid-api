import { GetUsersMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeGetUserMetricsUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const useCase = new GetUsersMetricsUseCase(checkinsRepository); 

    return useCase
}