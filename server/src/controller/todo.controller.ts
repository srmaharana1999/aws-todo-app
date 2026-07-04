import type { Request, Response } from "express"
import { prismaClient } from "../lib/prisma";
import { AppError } from "../middleware/globalErrorHandler";



const createATodo = async (req: Request, res: Response) => {
    const { title, description, status, priority, dueDate, category } = req.body;

    const result = await prismaClient.todo.create({
        data: {
            title,
            description,
            status,
            priority,
            dueDate,
            category,
        }
    });

    res.status(201).json({ result })
};



const getAllTodos = async (req: Request, res: Response) => {
    const result = await prismaClient.todo.findMany();
    res.status(200).json({ result });
};


const getTodoDetails = async (req: Request, res: Response) => {
    const todoId = req.params.id;

    if (!todoId) {
        throw new AppError("Todo ID is required", 400)
    }

    if (Array.isArray(todoId)) {
        throw new AppError("Todo ID must be unique", 400)
    }
    const result = await prismaClient.todo.findUnique({ where: { id: todoId } });

    if (!result) {
        throw new AppError("Todo not found", 404)
    }
    res.status(200).json({ result });
}


const updateATodo = async (req: Request, res: Response) => {
    const todoId = req.params.id;
    const { title, description, status, priority, dueDate, category } = req.body;

    if (!todoId) {
        throw new AppError("Todo ID is required", 400)
    }

    if (Array.isArray(todoId)) {
        throw new AppError("Todo ID must be unique", 400)
    }

    const result = await prismaClient.todo.update({
        where: {
            id: todoId,
        },
        data: {
            title,
            description,
            status,
            priority,
            dueDate,
            category,
        }
    });

    res.status(200).json({ result });
};


const deleteATodo = async (req: Request, res: Response) => {
    const todoId = req.params.id;

    if (!todoId) {
        throw new AppError("Todo ID is required", 400)
    }

    if (Array.isArray(todoId)) {
        throw new AppError("Todo ID must be unique", 400)
    }

    const result = await prismaClient.todo.delete({
        where: {
            id: todoId,
        },
    });

    res.status(200).json({ result });
}



export { createATodo, getAllTodos, updateATodo, getTodoDetails, deleteATodo }