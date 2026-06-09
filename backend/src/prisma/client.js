import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "@prisma/client"

/**
 * Prisma 7 usa "driver adapters": a conexão é fornecida por um adapter externo.
 * Aqui usamos o adapter MariaDB (compatível com MySQL), construindo a configuração
 * a partir da DATABASE_URL definida no .env.
 */
const databaseUrl = process.env["DATABASE_URL"]
if (!databaseUrl) {
    throw new Error("DATABASE_URL não está definida. Verifique o arquivo .env.")
}

const url = new URL(databaseUrl)
const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, "")
})

/**
 * Instância única (singleton) do Prisma Client compartilhada por toda a aplicação.
 * Toda manipulação do banco passa por aqui, usando a linguagem ORM do Prisma.
 */
export const prisma = new PrismaClient({ adapter })