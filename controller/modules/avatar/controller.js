'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Create a new avatar
exports.createAvatar = (req, res) => {
  const { userId, exp, gold, level, health, maxhealth } = req.body;

  if (!userId || !exp || !gold || !level || !health || !maxhealth) {
    return response.serverError('All fields are required', res);
  }

  const query = `INSERT INTO avatar (userId, exp, gold, level, health, maxhealth) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [userId, exp, gold, level, health, maxhealth], (err, result) => {
    if (err) {
      console.error('Error creating avatar:', err);
      response.serverError('Error creating avatar', res);
    } else {
      response.success({
        message: 'Avatar created successfully',
        data: { avatarId: result.insertId, userId, exp, gold, level, health, maxhealth },
      }, res);
    }
  });
};

// Get all avatars
exports.getAllAvatars = (req, res) => {
  const query = 'SELECT * FROM avatar';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching avatars:', err);
      response.serverError('Error fetching avatars', res);
    } else {
      response.success({
        message: 'Avatars retrieved successfully',
        data: results,
      }, res);
    }
  });
};

// Get avatar by userId
exports.getAvatarByUserId = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return response.serverError('User ID is required', res);
  }

  const query = 'SELECT * FROM avatar WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching avatar by userId:', err);
      response.serverError('Error fetching avatar by userId', res);
    } else if (results.length === 0) {
      response.serverError('No avatar found for this user', res);
    } else {
      response.success({
        message: `Avatar for userId ${userId} retrieved successfully`,
        data: results[0],
      }, res);
    }
  });
};

// Update an avatar
exports.updateAvatar = (req, res) => {
  const { avatarId } = req.params;
  const { exp, gold, level, health, maxhealth } = req.body;

  if (!avatarId) {
    return response.serverError('Avatar ID is required', res);
  }

  const query = `UPDATE avatar 
                 SET exp = ?, gold = ?, level = ?, health = ?, maxhealth = ? 
                 WHERE avatarId = ?`;
  db.query(query, [exp, gold, level, health, maxhealth, avatarId], (err, result) => {
    if (err) {
      console.error('Error updating avatar:', err);
      response.serverError('Error updating avatar', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Avatar not found', res);
    } else {
      response.success({
        message: `Avatar with ID ${avatarId} updated successfully`,
        data: { avatarId, exp, gold, level, health, maxhealth },
      }, res);
    }
  });
};

// Delete an avatar
exports.deleteAvatar = (req, res) => {
  const { avatarId } = req.params;

  if (!avatarId) {
    return response.serverError('Avatar ID is required', res);
  }

  const query = 'DELETE FROM avatar WHERE avatarId = ?';
  db.query(query, [avatarId], (err, result) => {
    if (err) {
      console.error('Error deleting avatar:', err);
      response.serverError('Error deleting avatar', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Avatar not found', res);
    } else {
      response.success({
        message: `Avatar with ID ${avatarId} deleted successfully`,
      }, res);
    }
  });
};
