const express = require('express');
const router = express.Router();
const todoController = require('../../controller/todoListController');
const MiddlewareJwt = require('../../controller/utils/middlewareJwt');

router.get('/', MiddlewareJwt.authenticateJWT, todoController.getAllToDos); // Get all ToDos

router.post('/', MiddlewareJwt.authenticateJWT, todoController.createToDo); // Create a new ToDo

module.exports = router;
