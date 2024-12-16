const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');

router.post('/register', authController.registerUser);
router.get('/register', (req, res) => {
  res.status(200).json({
    message: 'Hello',
  });
});

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

router.get('/me', authController.authenticateJWT, authController.cekMe);

module.exports = router;
