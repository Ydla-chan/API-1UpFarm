const express = require('express');
const router = express.Router();

// Import semua route
const authRouter = require('./auth');
const userRouter = require('./user');
const avatarRouter = require('./avatar');
const plantRouter = require('./plant');
const todoListRouter = require('./todoList');
const todoTaskRouter = require('./todoTask');
const userPlantRouter = require('./userPlant');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/avatar', avatarRouter);
router.use('/plant', plantRouter);
router.use('/todoList', todoListRouter);
router.use('/todoTask', todoTaskRouter);
router.use('/user', userPlantRouter);

// router.get('/auth', (req, res) => {
//   res.status(200).json({
//     message: 'Hello',
//   });
// });

module.exports = router;
