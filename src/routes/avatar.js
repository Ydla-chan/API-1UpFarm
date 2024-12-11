const express = require('express');
const router = express.Router();
const avatarController = require('../../controller/avatarController');

router.get('/', avatarController.getAllAvatars); // Get all avatars
router.post('/', avatarController.createavatars); // Create a new avatar
router.put('/:avatarId', avatarController.updateavatars); // Update an avatar by ID
router.delete('/:avatarId', avatarController.deleteavatars); // Delete an avatar by ID
router.get('/user/:userId', avatarController.getavatarsByUserId);

module.exports = router;
