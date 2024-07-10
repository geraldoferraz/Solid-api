import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUsersCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";


export async function history (request: FastifyRequest, response: FastifyReply) {

    const chekinsHistoryBodySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = chekinsHistoryBodySchema.parse(request.query)

        const fetchUserCheckinsHistoryUseCase = makeFetchUsersCheckinHistoryUseCase()

        const { checkIns } = await fetchUserCheckinsHistoryUseCase.execute({ 
            userId: request.user.sub,
            page
        })

        return response.send({ checkIns }).status(200)
}