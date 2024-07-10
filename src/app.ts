import fastify from "fastify";
import { userRoutes } from "./http/controller/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { gymRoutes } from "./http/controller/gyms/routes";
import { checkinsRoutes } from "./http/controller/checkins/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret:  env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m',
    }
})//chamando jwt

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkinsRoutes)

app.setErrorHandler((error, request, response) => {//tratando erros globalmente 
    if(error instanceof ZodError){
        return response
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error); 
    } 

    return response.status(500).send({ message: 'Internal Server Error' })
})