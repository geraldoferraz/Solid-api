import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";


export async function search (request: FastifyRequest, response: FastifyReply) {

    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page } = searchGymsQuerySchema.parse(request.query)

        const searchGymUseCase = makeSearchGymsUseCase()

        const { gyms } = await searchGymUseCase.execute({ 
            query,
            page
        })

        return response.send({ gyms }).status(200)
}