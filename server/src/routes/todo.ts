import { Router } from "express";
import { createATodo, deleteATodo, getAllTodos, getTodoDetails, updateATodo } from "../controller/todo.controller";

const router = Router();


router.post("/", createATodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoDetails);
router.patch("/:id", updateATodo);
router.delete("/:id", deleteATodo);

export default router;