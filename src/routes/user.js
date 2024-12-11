const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:id', userController.getUserById); // Get a user by ID

router.put('/:id', userController.updateUser); // Update a user by ID

router.delete('/:id', userController.deleteUser); // Delete a user by ID

module.exports = router;
