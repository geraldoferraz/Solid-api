import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";


export async function nearby (request: FastifyRequest, response: FastifyReply) {

    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

        const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

        const { gyms } = await nearbyGymUseCase.execute({ 
            userLatitude: latitude,
            userLongitude: longitude
        })

        return response.send({ gyms }).status(200)
}