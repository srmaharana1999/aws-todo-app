import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/globalErrorHandler.js";
import todoRouter from "./routes/todo.js";
import { config } from "./config.js";

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(201).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/todos", todoRouter);

// Error Handler

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
