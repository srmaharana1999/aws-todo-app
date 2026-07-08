import "dotenv/config";
import { prismaClient } from "./lib/prisma.js";
import app from "./app.js";
import { config } from "./config.js";

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
    process.exit(1);
  }
})();
