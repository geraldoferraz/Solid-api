import { CheckinsRepository } from "@/repositories/prisma/checkins-repository";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { UsersRepository } from "@/repositories/prisma/user-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn, User } from "@prisma/client";
import { compare } from "bcryptjs";
import { error } from "console";

interface CheckinUseCaseRequest {
    userId: string,
    gymId: string
    userLatitude: number,
    userLongitude: number
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(//dependecias que o caso de uso vai ter 
        private checkInsRepository: CheckinsRepository,
        private gymsRepository: GymsRepository
        ){}

        async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{

            const gym = await this.gymsRepository.findById(gymId)

            if(!gym){
                throw new Error('Error: Gym not Found')
            }

            const distance = getDistanceBetweenCoordinates(
                {latitude: userLatitude, longitude: userLongitude},
                {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
            )

            const MAX_DISTANCE_IN_KILOMETERS = 0.1

            if(distance > MAX_DISTANCE_IN_KILOMETERS){
                throw new Error('Error: Invalid Checkin')
            }

            const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
                userId,
                new Date(),
            )

            if(checkInOnSameDay){
                throw new Error()
            }

            const checkIn = await this.checkInsRepository.create({
                user_id: userId, 
                gym_id: gymId, 
            });
        
            return { checkIn }
        }
}