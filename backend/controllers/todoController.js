const Todo = require("../models/Todo");

const mongoose = require("mongoose");
//create new todo
const createTodo = async (req, res) => {
  //console.log(req.userId,"userId")
  // console.log("CONTROLLER")
  try {
    const userId = req.userId;
    const { task, status } = req.body;
    const todo = new Todo({
      task,
      status,
      createdBy: String(userId),
    });

    console.log({ todo });

    const saved = await todo.save();

    return res.json({
      success: true,
      message: "Todo created successfully",
      data: saved,
    });
  } catch (error) {
    console.log("=============ERROR==============", error);
    //res.status(500).json({ success: false, error: `Error occured due to ${error}` });
  }
};

//get All Todo

const getAllTodo = async (req, res) => {
  try {
    //console.log("GET ALL TODO")
    const todos = await Todo.find({ createdBy: req.userId });

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTodo)
      return res
        .status(404)
        .json({ error: "Todo not found or not authorized" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete Todo
const deleteTodo = async (req, res) => {
  try {
    const userId = String(req.userId);
    if (!userId) return false;

    const id = req.params.id;
    if (!id) return false;

    const todoId = mongoose.Types.ObjectId.createFromHexString(id); // Convert string to ObjectId
    const todouser = await Todo.findOneAndDelete({
      _id: todoId,
      createdBy: String(userId),
    });
    console.log({ todouser });
    if (!todouser) {
      throw new Error(404, "Todo does not exist!");
    }

    return res.status(204).end(); // Successfully deleted
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createTodo, getAllTodo, updateTodo, deleteTodo };
