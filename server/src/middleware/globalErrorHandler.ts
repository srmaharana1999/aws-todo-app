import type { NextFunction, Request, Response } from "express"

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, AppError.prototype);
    }

}

export const notFoundHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const globalErrorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const isOperational = err instanceof AppError ? err.isOperational : false;

    if (!isOperational) {
        console.log(err);
    }

    const message = isOperational ? err.message : (process.env.NODE_ENV === "production" ? "Something went wrong!" : err.message);
    const status = statusCode >= 500 ? "error" : "fail";

    res.status(statusCode).json({
        status,
        statusCode,
        message,
        isOperational,
    });


}