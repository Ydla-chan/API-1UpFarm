'use strict';

const db = require('../../../connection/conn');
const response = require('../../../response/response');

// Pembuatan Tanaman Baru 
exports.createPlant = (req, res) => {
  const { UrlPicture, harvestDay, plantName, difficulty } = req.body;

  const query = `INSERT INTO plants (UrlPicture, harvestDay, plantName, difficulty) 
                 VALUES (?, ?, ?, ?)`;
  db.query(query, [UrlPicture, harvestDay, plantName, difficulty], (err, result) => {
    if (err) {
      console.error('Error creating plant:', err);
      response.serverError('Error creating plant', res);
    } else {
      response.success({ plantId: result.insertId, UrlPicture, harvestDay, plantName, difficulty }, res);
    }
  });
};

// Pengambilan Data Tanaman 
exports.getAllPlants = (req, res) => {
  const query = 'SELECT * FROM plants';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching plants:', err);
      response.serverError('Error fetching plants', res);
    } else {
      response.success(results, res);
    }
  });
};

// Get plant by ID
exports.getPlantById = (req, res) => {
  const { plantId } = req.params;
  const query = 'SELECT * FROM plants WHERE plantId = ?';
  db.query(query, [plantId], (err, results) => {
    if (err) {
      console.error('Error fetching plant by ID:', err);
      response.serverError('Error fetching plant by ID', res);
    } else if (results.length === 0) {
      response.serverError('Plant not found', res);
    } else {
      response.success(results[0], res);
    }
  });
};

// Update plant information
exports.updatePlant = (req, res) => {
  const { plantId } = req.params;
  const { UrlPicture, harvestDay, plantName, difficulty } = req.body;

  const query = `UPDATE plants SET UrlPicture = ?, harvestDay = ?, plantName = ?, difficulty = ? 
                 WHERE plantId = ?`;
  db.query(query, [UrlPicture, harvestDay, plantName, difficulty, plantId], (err, result) => {
    if (err) {
      console.error('Error updating plant:', err);
      response.serverError('Error updating plant', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Plant not found', res);
    } else {
      response.success({ plantId, UrlPicture, harvestDay, plantName, difficulty }, res);
    }
  });
};

// Delete a plant
exports.deletePlant = (req, res) => {
  const { plantId } = req.params;

  const query = 'DELETE FROM plants WHERE plantId = ?';
  db.query(query, [plantId], (err, result) => {
    if (err) {
      console.error('Error deleting plant:', err);
      response.serverError('Error deleting plant', res);
    } else if (result.affectedRows === 0) {
      response.serverError('Plant not found', res);
    } else {
      response.success(`Plant with ID ${plantId} deleted successfully`, res);
    }
  });
};
