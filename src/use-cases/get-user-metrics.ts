import { CheckinsRepository } from "@/repositories/prisma/checkins-repository";
import { CheckIn } from "@prisma/client";

interface GetUsersMetricsUseCaseRequest {
    userId: string,
}

interface GetUsersMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUsersMetricsUseCase {
    constructor(//dependecias que o caso de uso vai ter 
        private checkInsRepository: CheckinsRepository
        ){}

        async execute({ userId }: GetUsersMetricsUseCaseRequest): Promise<GetUsersMetricsUseCaseResponse>{

            const checkInsCount = await this.checkInsRepository.countByUserId(userId)
        
            return { checkInsCount }
        }
}