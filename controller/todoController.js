// main logic for any api

import Todo from "../models/todoSchema.js";

// Create todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({
      userId: req.user.userId,
      title,
      description,
    });

    await todo.save();
    res.status(201).json({ message: "Todo created", todo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating todo", error: err.message });
  }
};

// Get all todos for user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    }); // -1 is descending order
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: err.message });
  }
};

// Get single todo
const getTodoById = async (req, res) => {
  try {
    const { todoId } = req.params.id;
    const todo = await Todo.findOne({ _id: todoId, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching todo", error: err.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      {
        title,
        description,
        completed,
      },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated", updatedTodo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: err.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: err.message });
  }
};

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
