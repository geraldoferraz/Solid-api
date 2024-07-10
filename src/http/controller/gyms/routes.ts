import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { search } from "./search"
import { nearby } from "./nearby"
import { create } from "./create"

export async function gymRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)//todas as rotas abaixo, somente usuarios autenticados conseguem acessar

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', create)

}
