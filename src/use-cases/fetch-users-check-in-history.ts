import { CheckinsRepository } from "@/repositories/prisma/checkins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUsersCheckInHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchUsersCheckInHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUsersCheckInHistoryUseCase {
    constructor(//dependecias que o caso de uso vai ter 
        private checkInsRepository: CheckinsRepository
        ){}

        async execute({ userId, page }: FetchUsersCheckInHistoryUseCaseRequest): Promise<FetchUsersCheckInHistoryUseCaseResponse>{

            const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

            if(!checkIns){
                throw new Error('Error: The User dont have checkins history.')
            }
        
            return { checkIns }
        }
}