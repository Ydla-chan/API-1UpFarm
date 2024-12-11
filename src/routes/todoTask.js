const express = require('express');
const router = express.Router();
const todoTaskController = require('../../controller/todoTaskController');
const MiddlewareJwt = require('../../controller/utils/middlewareJwt');

router.get('/', todoTaskController.getAllTodoTasks); // Get all todo tasks

router.post('/', todoTaskController.createTodoTask); // Create a new todo task

router.get('/:todoId', todoTaskController.getTodoTasksByTodoId); // Create a new todo task

router.put('/:todoTaskId', todoTaskController.updateTodoTask); // Create a new todo task

router.delete('/:todoTaskId', todoTaskController.deleteTodoTask); // Create a new todo task

module.exports = router;
