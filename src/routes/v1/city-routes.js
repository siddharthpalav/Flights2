const express = require('express');

const router = express.Router();
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

// /api/v1/cities POST
router.post(
	'/',
	CityMiddlewares.validateCreateRequest,
	CityController.createCity
);

// /api/v1/cities GET
router.get('/', CityController.getCities);

// /api/v1/cities/:id GET
router.get('/:id', CityController.getCity);

// /api/v1/cities/:id DELETE
router.delete('/:id', CityController.destroyCity);

// /api/v1/cities/:id PATCH
router.patch('/:id', CityController.updateCity);

module.exports = router;
