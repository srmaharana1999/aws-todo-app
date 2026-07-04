import { Router } from "express";
import { createATodo, getAllTodos, getTodoDetails, updateATodo } from "../controller/todo.controller";

const router = Router();


router.post("/", createATodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoDetails);
router.patch("/:id", updateATodo)
router.delete("/",)

export default router;