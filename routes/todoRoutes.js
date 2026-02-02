import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controller/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create todo
router.post("/", authMiddleware, createTodo); // -> /api/todos -> make post req  ->then you can create a todo
// router.post('/create', createTodo); // -> /api/todos/create ->  make post req  -> then you can create
// it depends on backend perspn which api to expose to frontend

// Get all todos for user
router.get("/", authMiddleware, getTodos); // /api/todos ->  make get req -> then you will get all todos
// router.get('/all', getTodos); //-> /api/todos/all -> make get req -> then you will get all todos
// it depends on backend perspn which api to expose to frontend

// Get single todo
router.get("/:id", authMiddleware, getTodoById); // /api/todos/{dynamic_id} -> get info about that particular todo

// Update todo
router.put("/:id", authMiddleware, updateTodo); // /api/todos/{dynamic_id}  -> update logic

// Delete todo
router.delete("/:id", authMiddleware, deleteTodo); // /api/todos/{dynamic_id}  -> delete logic

export default router;
