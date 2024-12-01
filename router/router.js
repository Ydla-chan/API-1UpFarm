'use strict';

const userController = require('../controller/modules/user/controller');
const userPlantController = require('../controller/modules/userPlant/controller');
const plantController = require('../controller/modules/plant/controller');
const todoController = require('../controller/modules/todolist/controller');
const todoTaskController = require('../controller/modules/todotask/controller');
const avatarController = require('../controller/modules/avatar/controller');
const authController = require('../controller/modules/user/AuthController');
const MiddlewareJwt = require('../controller/utils/middlewareJwt');

module.exports = (app) => {
  // **Auth Routes**
  app.route('/auth/register').post(authController.registerUser); // Register user
  app.route('/auth/login').post(authController.loginUser); // Login user
  app.route('/auth/logout').post(authController.logoutUser); // Logout user

  // **User Routes**
  app.route('/user')
    .get(userController.getUsers) // Get all users
    .post(userController.createUser); // Create a new user

  app.route('/user/:id')
    .get(userController.getUserById) // Get a user by ID
    .put(userController.updateUser) // Update a user by ID
    .delete(userController.deleteUser); // Delete a user by ID

  // **UserPlant Routes**
  app.route('/userPlant')
    .get(MiddlewareJwt.authenticateJWT, userPlantController.getAllUserPlants) // Get all user plants (protected)
    .post(MiddlewareJwt.authenticateJWT, userPlantController.createUserPlant); // Create a new user plant (protected)

  app.route('/userPlant/:userId')
    .get(MiddlewareJwt.authenticateJWT, userPlantController.getUserPlantsByUserId); // Get user plants by userId (protected)

  app.route('/userPlant/:userPlantId')
    .put(MiddlewareJwt.authenticateJWT, userPlantController.updateUserPlant) // Update a user plant by ID (protected)
    .delete(MiddlewareJwt.authenticateJWT, userPlantController.deleteUserPlant); // Delete a user plant by ID (protected)

  // **ToDoList Routes**
  app.route('/todoList')
    .get(todoController.getAllToDos) // Get all ToDos
    .post(todoController.createToDo); // Create a new ToDo

  app.route('/todoList/:userPlantId')
    .get(todoController.getToDosByUserPlantId); // Get ToDos by userPlantId

  app.route('/todoList/:todoId')
    .put(todoController.updateToDo) // Update a ToDo
    .delete(todoController.deleteToDo); // Delete a ToDo

  // **TodoTask Routes**
  app.route('/todoTask')
    .get(todoTaskController.getAllTodoTasks) // Get all todo tasks
    .post(todoTaskController.createTodoTask); // Create a new todo task

  app.route('/todoTask/:todoId')
    .get(todoTaskController.getTodoTasksByTodoId); // Get tasks by todoId

  app.route('/todoTask/:todoTaskId')
    .put(todoTaskController.updateTodoTask) // Update a todo task by ID
    .delete(todoTaskController.deleteTodoTask); // Delete a todo task by ID

  // **Plant Routes**
  app.route('/plant')
    .get(plantController.getAllPlants) // Get all plants
    .post(plantController.createPlant); // Create a new plant

  app.route('/plant/:plantId')
    .get(plantController.getPlantById) // Get a plant by ID
    .put(plantController.updatePlant) // Update a plant by ID
    .delete(plantController.deletePlant); // Delete a plant by ID

  // **Avatar Routes**
  app.route('/avatar')
    .get(avatarController.getAllAvatars) // Get all avatars
    .post(avatarController.createavatars); // Create a new avatar

  app.route('/avatar/:avatarId')
    .put(avatarController.updateavatars) // Update an avatar by ID
    .delete(avatarController.deleteavatars); // Delete an avatar by ID

  app.route('/avatar/user/:userId')
    .get(avatarController.getavatarsByUserId); // Get avatar by user ID
};
