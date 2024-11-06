const express = require("express");
const handleError = require("../helpers/handleError");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const TaskRoutes = express.Router();

TaskRoutes.get("/all", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ success: true, data: allTasks });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

TaskRoutes.post("/new", async (req, res) => {
  const { title, link, image, price, claimTask } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newTask = new Task({ title, link, image, price, claimTask });
    await newTask.save();

    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Begin task
TaskRoutes.post("/start/:chatId/:taskId", async (req, res) => {
  let { chatId, taskId } = req.params;

  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    if (!taskId) {
      return res
        .status(401)
        .json({ success: false, error: "Task id is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const task = await Task.findById(taskId);
    if (!user) {
      return res.status(404).json({ success: false, error: "Task not found." });
    }

    if (user.ongoingTasks.includes(taskId)) {
      return res
        .status(401)
        .json({ success: false, error: "Task already started." });
    }

    if (user.completedTasks.includes(taskId)) {
      return res
        .status(401)
        .json({ success: false, error: "Task already completed." });
    }

    user.ongoingTasks.push(taskId);

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        data: {
          ongoingTasks: user.ongoingTasks,
          completedTasks: user.completedTasks,
        },
        message: "Task started.",
      });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Complete task
TaskRoutes.post("/finish/:chatId/:taskId", async (req, res) => {
  let { chatId, taskId } = req.params;
  let { balance } = req.body;

  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    if (!taskId) {
      return res
        .status(401)
        .json({ success: false, error: "Task id is required." });
    }

    if (!balance) {
      return res
        .status(401)
        .json({ success: false, error: "Balance is required." });
    }

    chatId = parseInt(chatId);

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found." });
    }

    if (user.completedTasks.includes(taskId)) {
      return res
        .status(401)
        .json({ success: false, error: "Task already completed." });
    }

    if (!user.ongoingTasks.includes(taskId)) {
      return res
        .status(401)
        .json({ success: false, error: "Please start the task first." });
    }

    //Remove task from ongoing task
    user.ongoingTasks = user.ongoingTasks.filter(
      (eachOngoingTask) => eachOngoingTask !== taskId
    );

    //Mark task completed
    user.completedTasks.push(taskId);

    //Credit user
    let totalBalance = balance+1000
    user.balance = totalBalance;

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        data: {
          balance: user.balance,
          ongoingTasks: user.ongoingTasks,
          completedTasks: user.completedTasks,
        },
        message: "Task completed.",
      });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

module.exports = TaskRoutes;
