import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, response: FastifyReply){
    try{
        await request.jwtVerify()
    } catch (err){
        response.status(401).send({ message: 'Unathorized' })
    }
}