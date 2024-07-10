import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUsersCheckinHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";


export async function metrics (request: FastifyRequest, response: FastifyReply) {

    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await getUserMetricsUseCase.execute({ 
        userId: request.user.sub,
    })

    return response.send({ checkInsCount }).status(200)
}