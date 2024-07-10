import { FastifyInstance } from "fastify"
import { register, getUser, getAllUsers, getUserWithEmail } from "./register"
import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function userRoutes(app: FastifyInstance){
    app.post('/users', register)//cadastro
    app.post('/sessions', authenticate)//retorna o token do jwt --> login

    //so acessa essas rotas se o user estiver autenticado
    app.get('/user/id/:id', getUser)
    app.get('/users', getAllUsers)
    app.get('/user/email/:email', getUserWithEmail)
    app.get('/me', { onRequest: [verifyJWT] }, profile)
}
