import "dotenv/config";
import { prismaClient } from "./lib/prisma";
import app from "./app";
import { config } from "./config";


const PORT = config.port;


(async function () {
    try {
        await prismaClient.$connect();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect to database: ", error);
        process.exit(1)
    }
})();
