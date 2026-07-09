import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { config } from "../config.js";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = config.dbUrl;

console.log("DB URL:", connectionString);

const adapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
