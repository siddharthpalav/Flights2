const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessReponse, ErrorResponse } = require('../utils/common');
/**
 *
 * POST : /cities
 * req-body {name: 'London'}
 */
async function createCity(req, res) {
	try {
		const city = await CityService.createCity({
			name: req.body.name
		});
		SuccessReponse.message = 'Successfully created a city';
		SuccessReponse.data = city;
		return res.status(StatusCodes.CREATED).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 *
 * GET : /cities
 */
async function getCities(req, res) {
	try {
		const cities = await CityService.getCities();
		SuccessReponse.data = cities;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * GET : /cities/:id
 */
async function getCity(req, res) {
	try {
		const city = await CityService.getCity(req.params.id);
		SuccessReponse.data = city;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * DELETE : /cities/:id
 */
async function destroyCity(req, res) {
	try {
		const city = await CityService.destroyCity(req.params.id);
		SuccessReponse.data = city;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * UPDATE : /cities/:id
 * req.body {name: 'mumbai'}
 */
async function updateCity(req, res) {
	try {
		const city = await CityService.updateCity(req.body, req.params.id);
		SuccessReponse.data = city;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	createCity,
	getCities,
	getCity,
	destroyCity,
	updateCity
};
