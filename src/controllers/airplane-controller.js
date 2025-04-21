const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessReponse, ErrorResponse } = require('../utils/common');

/**
 *
 * POST : /airplanes
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirplane(req, res) {
	try {
		const airplane = await AirplaneService.createAirplane({
			modelNumber: req.body.modelNumber,
			capacity: req.body.capacity
		});
		SuccessReponse.message = 'Successfully created an airplane';
		SuccessReponse.data = airplane;
		return res.status(StatusCodes.CREATED).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getAirplanes(req, res) {
	try {
		const airplanes = await AirplaneService.getAirplanes();
		SuccessReponse.data = airplanes;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getAirplane(req, res) {
	try {
		const airplane = await AirplaneService.getAirplane(req.params.id);
		SuccessReponse.data = airplane;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * DELETE : /airplanes
 * req.params.id
 */
async function destroyAirplane(req, res) {
	try {
		const airplane = await AirplaneService.destroyAirplane(req.params.id);
		SuccessReponse.data = airplane;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * UPDATE : /airplanes
 * req.body {modelNumber: 'airbus320', capacity: 200}
 */
async function updateAirplane(req, res) {
	try {
		const airplane = await AirplaneService.updateAirplane(
			req.body,
			req.params.id
		);
		SuccessReponse.data = airplane;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	createAirplane,
	getAirplanes,
	getAirplane,
	destroyAirplane,
	updateAirplane
};
