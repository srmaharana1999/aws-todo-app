import express from "express";
import type { Request, Response } from "express"
import { globalErrorHandler, notFoundHandler } from "./middleware/globalErrorHandler";
import todoRouter from "./routes/todo"


const app = express();

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
    res.status(201).json({ message: "Api server working fine" })
})


app.use("/api/todos", todoRouter);

// Error Handler

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;