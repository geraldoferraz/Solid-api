import { CheckIn, Prisma } from "@prisma/client";
import { CheckinsRepository } from "./checkins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckinsRepository{
    async findById(id: string) {
        const checkin = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkin
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')//retorna o dia
        const endOfTheDay = dayjs(date).endOf('date')//retorna o dia

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })
        return checkIn
    }

    async findManyByUserId(userId: string, page: number) {

        const checkins = prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return checkins
    }

    async countByUserId(userId: string) {

        const count = await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        })
        return count
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin = prisma.checkIn.create({
            data
        })

        return checkin
    }

    async save(data: CheckIn ){

        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data,
        })

        return checkIn
    }

}