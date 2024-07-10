import { CheckinsRepository } from "@/repositories/prisma/checkins-repository";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { UsersRepository } from "@/repositories/prisma/user-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn, User } from "@prisma/client";
import { compare } from "bcryptjs";
import { error } from "console";
import dayjs from "dayjs";

interface ValidateCheckinUseCaseRequest {
    checkInId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(//dependecias que o caso de uso vai ter 
        private checkInsRepository: CheckinsRepository,
        ){}

        async execute({ checkInId }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse>{

            const checkIn = await this.checkInsRepository.findById(checkInId)

            if(!checkIn){
                throw new Error('Error: CheckIn not Found')
            }

            const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
                checkIn.created_at,
                'minutes'
            )//estamos calculando a diferenca do tempo entre agora e o createdat do checkin

            if(distanceInMinutesFromCheckinCreation > 20){
                throw new Error('Error: The checkin can only be validated until 20 minutes of its creation.')
            }

            checkIn.validated_at = new Date()

            await this.checkInsRepository.save(checkIn)
        
            return { checkIn }
        }
}