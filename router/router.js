'use strict';

const express = require('express');
const userController = require('../controller/userController');
const userPlantController = require('../controller/userPlantController');
const plantController = require('../controller/modules/plant/plantController');
const todoController = require('../controller/todoListController');
const todoTaskController = require('../controller/modules/todotask/todoTaskController');
const avatarController = require('../controller/avatarController');
const authController = require('../controller/authController');
const MiddlewareJwt = require('../controller/utils/middlewareJwt');

module.exports = (app) => {
  const router = express.Router();

  // // **Auth Routes**
  // router.post('/auth/register', authController.registerUser); // Register user
  // router.post('/auth/login', authController.loginUser); // Login user
  // router.post('/auth/logout', authController.logoutUser); // Logout user
  // router.get('/auth/cekme', authController.cekMe); // Cek auth dan return user info

  // // **User Routes**
  // router
  //   .route('/user')
  //   .get(userController.getUsers) // Get all users
  //   .post(userController.createUser); // Create a new user

  // router
  //   .route('/user/:id')
  //   .get(userController.getUserById) // Get a user by ID
  //   .put(userController.updateUser) // Update a user by ID
  //   .delete(userController.deleteUser); // Delete a user by ID

  // // **UserPlant Routes**
  // router
  //   .route('/userPlant')
  //   .get(MiddlewareJwt.authenticateJWT, userPlantController.getAllUserPlants) // Get all user plants (protected)
  //   .post(MiddlewareJwt.authenticateJWT, userPlantController.createUserPlant); // Create a new user plant (protected)

  // router
  //   .route('/userPlant/:userId')
  //   .get(
  //     MiddlewareJwt.authenticateJWT,
  //     userPlantController.getUserPlantsByUserId
  //   ); // Get user plants by userId (protected)

  // router
  //   .route('/userPlant/:userPlantId')
  //   .put(MiddlewareJwt.authenticateJWT, userPlantController.updateUserPlant) // Update a user plant by ID (protected)
  //   .delete(MiddlewareJwt.authenticateJWT, userPlantController.deleteUserPlant); // Delete a user plant by ID (protected)

  // // **ToDoList Routes**
  // router
  //   .route('/todoList')
  //   .get(todoController.getAllToDos) // Get all ToDos
  //   .post(todoController.createToDo); // Create a new ToDo

  // router
  //   .route('/todoList/:userPlantId')
  //   .get(todoController.getToDosByUserPlantId); // Get ToDos by userPlantId

  // router
  //   .route('/todoList/:todoId')
  //   .put(todoController.updateToDo) // Update a ToDo
  //   .delete(todoController.deleteToDo); // Delete a ToDo

  // // **TodoTask Routes**
  // router
  //   .route('/todoTask')
  //   .get(todoTaskController.getAllTodoTasks) // Get all todo tasks
  //   .post(todoTaskController.createTodoTask); // Create a new todo task

  // router
  //   .route('/todoTask/:todoId')
  //   .get(todoTaskController.getTodoTasksByTodoId); // Get tasks by todoId

  // router
  //   .route('/todoTask/:todoTaskId')
  //   .put(todoTaskController.updateTodoTask) // Update a todo task by ID
  //   .delete(todoTaskController.deleteTodoTask); // Delete a todo task by ID

  // **Plant Routes**
  // router
  //   .route('/plant')
  //   .get(plantController.getAllPlants) // Get all plants
  //   .post(plantController.createPlant); // Create a new plant

  // router
  //   .route('/plant/:plantId')
  //   .get(plantController.getPlantById) // Get a plant by ID
  //   .put(plantController.updatePlant) // Update a plant by ID
  //   .delete(plantController.deletePlant); // Delete a plant by ID

  // **Avatar Routes**
  router
    .route('/avatar')
    .get(avatarController.getAllAvatars) // Get all avatars
    .post(avatarController.createavatars); // Create a new avatar

  router
    .route('/avatar/:avatarId')
    .put(avatarController.updateavatars) // Update an avatar by ID
    .delete(avatarController.deleteavatars); // Delete an avatar by ID

  router.route('/avatar/user/:userId').get(avatarController.getavatarsByUserId); // Get avatar by user ID

  // Prefix all routes with '/api/v1'
  app.use('/api/v1', router);
};
