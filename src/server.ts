import { app } from './app'
import { env } from './env'

app.listen({
    host: '0.0.0.0', //dar acesso ao frontend 
    port: env.PORT,
}).then(() => {
    console.log('🚀 HTTP Server Running!')
})