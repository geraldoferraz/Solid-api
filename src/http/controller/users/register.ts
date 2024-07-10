import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaGetUsersRepository } from "@/repositories/prisma/prisma-getUsers-repository";
import { GetRegisterUseCase } from "@/use-cases/getRegister";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

interface Params {
    id: string
}

interface emailParams {
    email: string
}


export async function register (request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try{
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({ 
            name, 
            email,
            password
        })
    }catch(err){
        throw err
    }
}


export async function getUser(request: FastifyRequest<{ Params: Params }>, response: FastifyReply) {
     const { id }  = request.params; 
     console.log("ID recebido:", id);

    const getUsersRepository = new PrismaGetUsersRepository();
    const getRegister = new GetRegisterUseCase(getUsersRepository);

    try {
        const user = await getRegister.executeExplorer({ id });
        response.status(200).send({ user });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        response.status(404).send({ error: 'Erro na busca ao user'});
    }
    
}

export async function getAllUsers(request: FastifyRequest<{ Params: Params }>, response: FastifyReply) {

    const getUsersRepository = new PrismaGetUsersRepository(); //ligacao com o banco --> consultas e etc 
    const getRegister = new GetRegisterUseCase(getUsersRepository); 

    try{
        const allUsers = await getRegister.executeExplorerForAllUsers()
        response.status(200).send({ allUsers })
    } catch(err){
        return response.status(404).send('Internal service error');
    }
   
}

export async function getUserWithEmail(request: FastifyRequest<{ Params: emailParams }>, response: FastifyReply){
    
    const { email } = request.params; 
    console.log(email); 

    const getUsersRepository = new PrismaGetUsersRepository()
    const getRegister = new GetRegisterUseCase(getUsersRepository)

    try{
        const userByEmail = await getRegister.executeExplorerByEmail({email})
        response.status(200).send({ userByEmail })
    } catch(err){
        response.status(404).send('Internal Server Error')
    }

}
