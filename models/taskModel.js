const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {type:String, required:true},
    link: {type:String, required:true},
    image: String,
    price: Number,
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema)
module.exports = Task
