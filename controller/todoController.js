// main logic for any api

import Todo from "../models/todoSchema.js";

// Create todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
      userId: req.userId,
      title,
      description,
    });

    await todo.save();
    res.status(201).json({ message: 'Todo created', todo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo', error: err.message });
  }
}

// Get all todos for user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 }); // -1 is descending order
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
};

const getTodoById = () => {

}

const updateTodo = () => {

}

const deleteTodo = () => {

}

export {createTodo, getTodos, getTodoById, updateTodo, deleteTodo}