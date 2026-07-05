import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "./env.js";

const adapter = new PrismaPg({
    connectionString: DATABASE_URL
})

export const prisma = new PrismaClient({ adapter });

export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log("Successfully connected to the database via Prisma!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}