'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Create a new avatars
exports.createavatars = (req, res) => {
  const { userId, exp, gold, level, health, maxhealth } = req.body;

  if (!userId || !exp || !gold || !level || !health || !maxhealth) {
    return response.serverError('All fields are required', res);
  }

  const query = `INSERT INTO avatarss (userId, exp, gold, level, health, maxhealth) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [userId, exp, gold, level, health, maxhealth], (err, result) => {
    if (err) {
      console.error('Error creating avatars:', err);
      response.serverError('Error creating avatars', res);
    } else {
      response.success({
        message: 'avatars created successfully',
        data: { avatarId: result.insertId, userId, exp, gold, level, health, maxhealth },
      }, res);
    }
  });
};

// Get all avatars
exports.getAllAvatars = (req, res) => {
  const query = 'SELECT * FROM avatars';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching avatarss:', err);
      response.serverError('Error fetching avatarss', res);
    } else {
      response.success({
        message: 'avatarss retrieved successfully',
        data: results,
      }, res);
    }
  });
};

// Get avatars by userId
exports.getavatarsByUserId = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return response.serverError('User ID is required', res);
  }

  const query = 'SELECT * FROM avatars WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching avatars by userId:', err);
      response.serverError('Error fetching avatars by userId', res);
    } else if (results.length === 0) {
      response.serverError('No avatars found for this user', res);
    } else {
      response.success({
        message: `avatars for userId ${userId} retrieved successfully`,
        data: results[0],
      }, res);
    }
  });
};

// Update an avatars
exports.updateavatars = (req, res) => {
  const { avatarsId } = req.params;
  const { exp, gold, level, health, maxhealth } = req.body;

  if (!avatarsId) {
    return response.serverError('avatars ID is required', res);
  }

  const query = `UPDATE avatars 
                 SET exp = ?, gold = ?, level = ?, health = ?, maxhealth = ? 
                 WHERE avatarsId = ?`;
  db.query(query, [exp, gold, level, health, maxhealth, avatarsId], (err, result) => {
    if (err) {
      console.error('Error updating avatars:', err);
      response.serverError('Error updating avatars', res);
    } else if (result.affectedRows === 0) {
      response.serverError('avatars not found', res);
    } else {
      response.success({
        message: `avatars with ID ${avatarsId} updated successfully`,
        data: { avatarsId, exp, gold, level, health, maxhealth },
      }, res);
    }
  });
};

// Delete an avatars
exports.deleteavatars = (req, res) => {
  const { avatarsId } = req.params;

  if (!avatarsId) {
    return response.serverError('avatars ID is required', res);
  }

  const query = 'DELETE FROM avatars WHERE avatarsId = ?';
  db.query(query, [avatarsId], (err, result) => {
    if (err) {
      console.error('Error deleting avatars:', err);
      response.serverError('Error deleting avatars', res);
    } else if (result.affectedRows === 0) {
      response.serverError('avatars not found', res);
    } else {
      response.success({
        message: `avatars with ID ${avatarsId} deleted successfully`,
      }, res);
    }
  });
};
