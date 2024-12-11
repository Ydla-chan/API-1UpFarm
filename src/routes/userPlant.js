const express = require('express');
const router = express.Router();

const userPlantController = require('../../controller/userPlantController');
const MiddlewareJwt = require('../../controller/utils/middlewareJwt');

router.get(
  '/',
  MiddlewareJwt.authenticateJWT,
  userPlantController.getAllUserPlants
);

router.post(
  '/',
  MiddlewareJwt.authenticateJWT,
  userPlantController.createUserPlant
);

module.exports = router;
