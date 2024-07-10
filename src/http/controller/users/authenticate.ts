import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AutheticateUseCase } from "@/use-cases/authenticate";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";


export async function authenticate (request: FastifyRequest, response: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(5)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

        try{

            const authenticateUseCase = makeAuthenticateUseCase(); 

           const { user } = await authenticateUseCase.execute({ 
                email,
                password
        })

        const token = await response.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await response.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            }
        })
        //o user perde o login caso passe 7dias sem entrar na aplicacao 

        return response
        .setCookie('refreshToken',refreshToken, {
            path: '/', //setando que totas podem usar o refreshToken
            secure: true, //deixa o valor encriptado, nao deixando o frontend acessar esse valor 
            sameSite: true, //o cookie so vai ser acessivel dentro do mesmo site/dominio
            httpOnly: true, //so deixa o cookie ser acessado pelo backend, assim o front nao tem acesso
        })
        .status(200).send({
            token,
        })

        } catch(err) {
        return response.status(400).send('Internal Server Error.')
    }
}



