import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { config } from "../config";

const connectionString = config.dbUrl;

const adapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
