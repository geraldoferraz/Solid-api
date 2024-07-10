import { CheckIn, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../prisma/checkins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckinsRepository {
    public items: CheckIn[] = []

    async findById(id: string){
        const checkIn = this.items.find((item) => item.id === id)

        if(!checkIn){
            return null
        }

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')//retorna o dia
        const endOfTheDay = dayjs(date).endOf('date')//retorna o dia

        const checkInOnSameDate = this.items.find((checkin) => {
            const checkInDate = dayjs(checkin.created_at)

            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkin.user_id === userId && isOnSameDate
        })

        if(!checkInOnSameDate){
            return null
        }
        return checkInOnSameDate
    }

    async findManyByUserId(userId: string, page: number){
        return this.items.filter((item) => item.user_id === userId).slice((page - 1) * 20, page * 20)
    }

    async countByUserId(userId: string){
        return this.items.filter((item) => item.user_id === userId).length
    }

    async create(data: Prisma.CheckInUncheckedCreateInput){

        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at): null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }

    async save(checkIn: CheckIn){
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

        if(checkInIndex >= 0){
            const checkinUpdate = this.items[checkInIndex] = checkIn
            return checkinUpdate
        }

        return checkIn
    }
}
 