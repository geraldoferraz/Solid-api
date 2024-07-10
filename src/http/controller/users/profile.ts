import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";



export async function profile (request: FastifyRequest, response: FastifyReply) {

    //await request.jwtVerify()  //Vai buscar o token nos headers para ver se ee existe e vai validar o token 
    //nao utilizamos mais aqui, pois criamos uma funcao para o jwtVerify nos middlewares e usamos essa funcao no routes 

    console.log(request.user.sub)//pegando o id do user 

    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: request.user.sub
    })

    return response.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}

//colocamos o password hash como undefined pois nao retornamos a senha do user 



