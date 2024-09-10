require("dotenv").config();
const mongoose=require("mongoose");
const express=require('express');
const app=express();
const cors=require('cors');
const useRoute=require("./routes/userRoutes");
const todoRoutes=require("./routes/todoRoutes");


app.use(cors())
//app.use(express.static("public"));
app.use(express.json());
//const port=process.env.PORT||5000;
const port=4000;
app.use("/api",useRoute);
app.use("/api",todoRoutes);

//const TodoModel=require('./models/Todo')
mongoose.connect("mongodb://127.0.0.1:27017/todoList").then(()=>{
    console.log("database connected")
});



app.listen (port,()=>{console.log(`server is running on port ${port}`)});