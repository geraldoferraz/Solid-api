import { FetchUsersCheckInHistoryUseCase } from "../fetch-users-check-in-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeFetchUsersCheckinHistoryUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository()
    const useCase = new FetchUsersCheckInHistoryUseCase(checkinsRepository); 

    return useCase
}