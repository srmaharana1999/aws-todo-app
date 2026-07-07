export const config = {
    port: process.env.PORT || 3000,
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    dbUrl: process.env.DATABASE_URL,
    isDev: process.env.NODE_ENV === "development"
}