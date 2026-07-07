import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/globalErrorHandler";
import todoRouter from "./routes/todo";
import { config } from "./config";

const app = express();

app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}))

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(201).json({ status: "ok", uptime: process.uptime(), message: "Api server working fine" });
});

app.use("/api/todos", todoRouter);

// Error Handler

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
