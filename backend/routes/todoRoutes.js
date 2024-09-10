const express=require('express');
const router=express.Router();
router.use(express.json());
const validateToken=require("../middleware/validateTokenHandler");
const todoController=require('../controllers/todoController');

//todo routes

router.post('/create/todo',validateToken, todoController.createTodo);
router.get('/alltodo',validateToken,todoController.getAllTodo);
router.delete('/deletetodo/:id',validateToken,todoController.deleteTodo);
router.put('/updatetodo/:id',validateToken,todoController.updateTodo);


module.exports=router;