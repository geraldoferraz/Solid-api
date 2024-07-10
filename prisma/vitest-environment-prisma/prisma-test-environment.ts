import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest'
import 'dotenv/config'

//DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"

function generateDatabaseUrl(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error('Please provide DATABASE_URL environment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment><unknown>{
    name: 'prisma',
    async setup() {
        const schema = randomUUID()

        console.log(generateDatabaseUrl(schema))


        return {
            async teardown() {
                console.log('tearDown');
            },
        };
    },
}