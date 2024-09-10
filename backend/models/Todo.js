const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
   
    createdBy: {
      type: String,
      required: true,
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
      
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;
