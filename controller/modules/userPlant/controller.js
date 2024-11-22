'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Create a new user plant
exports.createUserPlant = (req, res) => {
  const { userId, plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate } = req.body;

  if (!userId || !plantId || !PlantDate || !harvestDate || !Method_plant || !Location_Plant || !IsComplate) {
    return response.serverError('All fields are required', res);
  }

  const query = `INSERT INTO user_plants (userId, plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [userId, plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate], (err, result) => {
    if (err) {
      console.error('Error creating user plant:', err);
      response.serverError('Error creating user plant', res);
    } else {
      response.success({
        message: 'User plant created successfully',
        data: { userPlantId: result.insertId, userId, plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate },
      }, res);
    }
  });
};

// Get all user plants
exports.getAllUserPlants = (req, res) => {
  const query = `
    SELECT up.*, p.plantName, p.difficulty 
    FROM user_plants up 
    LEFT JOIN plants p ON up.plantId = p.plantId
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user plants:', err);
      response.serverError('Error fetching user plants', res);
    } else {
      response.success({
        data: results,
      }, res);
    }
  });
};

// Get user plants by userId
exports.getUserPlantsByUserId = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return response.serverError('User ID is required', res);
  }

  const query = `
    SELECT up.*, p.plantName, p.difficulty 
    FROM user_plants up 
    LEFT JOIN plants p ON up.plantId = p.plantId
    WHERE up.userId = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user plants by userId:', err);
      response.serverError('Error fetching user plants by userId', res);
    } else if (results.length === 0) {
      response.serverError('No plants found for this user', res);
    } else {
      response.success({
        message: `User plants for userId ${userId} retrieved successfully`,
        data: results,
      }, res);
    }
  });
};

// Update user plant information
exports.updateUserPlant = (req, res) => {
  const { userPlantId } = req.params;
  const { plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate } = req.body;

  if (!userPlantId) {
    return response.serverError('User Plant ID is required', res);
  }

  const query = `
    UPDATE user_plants 
    SET plantId = ?, PlantDate = ?, harvestDate = ?, Method_plant = ?, Location_Plant = ?, IsComplate = ? 
    WHERE userPlantId = ?
  `;
  db.query(query, [plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate, userPlantId], (err, result) => {
    if (err) {
      console.error('Error updating user plant:', err);
      response.serverError('Error updating user plant', res);
    } else if (result.affectedRows === 0) {
      response.serverError('User plant not found', res);
    } else {
      response.success({
        message: `User plant with ID ${userPlantId} updated successfully`,
        data: { userPlantId, plantId, PlantDate, harvestDate, Method_plant, Location_Plant, IsComplate },
      }, res);
    }
  });
};

// Delete a user plant
exports.deleteUserPlant = (req, res) => {
  const { userPlantId } = req.params;

  if (!userPlantId) {
    return response.serverError('User Plant ID is required', res);
  }

  const query = 'DELETE FROM user_plants WHERE userPlantId = ?';
  db.query(query, [userPlantId], (err, result) => {
    if (err) {
      console.error('Error deleting user plant:', err);
      response.serverError('Error deleting user plant', res);
    } else if (result.affectedRows === 0) {
      response.serverError('User plant not found', res);
    } else {
      response.success({
        message: `User plant with ID ${userPlantId} deleted successfully`,
      }, res);
    }
  });
};