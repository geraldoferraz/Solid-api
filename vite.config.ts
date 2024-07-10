import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma'] //toda vez que fomos rodar os testes dentro da pasta de controller, vamos usar o environment que estamos criando para testes 
        ],
    }
})