'use strict';

const userController = require('../controller/modules/user/controller');  
const userPlantController = require('../controller/modules/userPlant/controller');  
const plantController = require('../controller/modules/plant/controller');
const todoController = require('../controller/modules/todolist/controller'); 
const todoTaskController = require('../controller/modules/todotask/controller'); // Import TodoTask Controller
const response = require('../response/response'); // Utility response handling
const avatarController = require('../controller/modules/avatar/controller'); // Sesuaikan path dengan lokasi file controller
// const authMiddleware = require('../middleware/auth'); // Example for authentication middleware

module.exports = (app) => {

  // User Routes
  app.route('/user')
    .get(userController.getUsers)       // Get all users
    .post(userController.createUser);   // Create a new user

  app.route('/user/:id')
    .get(userController.getUserById)    // Get a user by ID
    .put(userController.updateUser)     // Update a user by ID
    .delete(userController.deleteUser); // Delete a user by ID

  // UserPlant Routes
  app.route('/userPlant')
    .get(userPlantController.getAllUserPlants)  // Get all user plants
    .post(userPlantController.createUserPlant); // Create a new user plant

  app.route('/userPlant/:userId')
    .get(userPlantController.getUserPlantsByUserId); // Get user plants by userId

  app.route('/userPlant/:userPlantId')
    .put(userPlantController.updateUserPlant)  // Update a user plant by ID
    .delete(userPlantController.deleteUserPlant); // Delete a user plant by ID

  // ToDoList Routes
  app.route('/todoList')
    .get(todoController.getAllToDos)  // Get all ToDos
    .post(todoController.createToDo); // Create a new ToDo

  app.route('/todoList/:userPlantId')
    .get(todoController.getToDosByUserPlantId); // Get ToDos by userPlantId

  app.route('/todoList/:todoId')
    .put(todoController.updateToDo)   // Update a ToDo
    .delete(todoController.deleteToDo); // Delete a ToDo

  // TodoTask Routes
  app.route('/todoTask')
    .get(todoTaskController.getAllTodoTasks) // Get all todo tasks
    .post(todoTaskController.createTodoTask); // Create a new todo task

  app.route('/todoTask/:todoId')
    .get(todoTaskController.getTodoTasksByTodoId); // Get tasks by todoId

  app.route('/todoTask/:todoTaskId')
    .put(todoTaskController.updateTodoTask)  // Update a todo task by ID
    .delete(todoTaskController.deleteTodoTask); // Delete a todo task by ID

  // Plant Routes
  app.route('/plant')
    .get(plantController.getAllPlants)  // Get all plants
    .post(plantController.createPlant); // Create a new plant

  app.route('/plant/:plantId')
    .get(plantController.getPlantById)  // Get a plant by ID
    .put(plantController.updatePlant)   // Update a plant by ID
    .delete(plantController.deletePlant); // Delete a plant by ID
  
    app.route('/avatar')
    .get(avatarController.getAllAvatars)   // Get all avatars
    .post(avatarController.createAvatar); // Create a new avatar
  
  app.route('/avatar/:avatarId')
    .put(avatarController.updateAvatar)    // Update an avatar by ID
    .delete(avatarController.deleteAvatar); // Delete an avatar by ID
  
  app.route('/avatar/user/:userId')
    .get(avatarController.getAvatarByUserId); 
};