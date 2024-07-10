import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckinUseCase } from "@/use-cases/factories/make-checkin-use-case";


export async function create (request: FastifyRequest, response: FastifyReply) {

    const createCheckinParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckinBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = createCheckinBodySchema.parse(request.body)
    const { gymId } = createCheckinParamsSchema.parse(request.params)

        const createCheckinUseCase = makeCheckinUseCase()

        await createCheckinUseCase.execute({ 
            gymId,
            userId: request.user.sub,
            userLatitude: latitude, 
            userLongitude: longitude 
        })
}