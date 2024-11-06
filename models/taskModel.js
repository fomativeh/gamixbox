const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String },
    image: String,
    price: Number,
    manualVerification: Boolean,
    claimTask: Boolean,
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);
module.exports = Task;
