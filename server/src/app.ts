import express from "express";
import type { Request, Response } from "express"
const app = express();

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
    res.status(201).json({ message: "Api server working fine" })
})


export default app;