const express = require('express');
const router = express.Router();
const plantController = require('../../controller/plantController');

router.get('/', plantController.getAllPlants); // Get all plants
router.post('/', plantController.createPlant);
router.get('/:plantId', plantController.getPlantById); // Get a plant by ID
router.put('/:plantId', plantController.updatePlant); // Update a plant by ID
router.delete('/:plantId', plantController.deletePlant);

module.exports = router;
