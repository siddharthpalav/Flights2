const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessReponse, ErrorResponse } = require('../utils/common');

/**
 *
 * POST : /airports
 * req-body {name: 'IGI', code: 'DEL', address: '', cityId: 5}
 */
async function createAirport(req, res) {
	try {
		const airport = await AirportService.createAirport({
			name: req.body.name,
			code: req.body.code,
			address: req.body.address,
			cityId: req.body.cityId
		});
		SuccessReponse.message = 'Successfully created an airport';
		SuccessReponse.data = airport;
		return res.status(StatusCodes.CREATED).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getAirports(req, res) {
	try {
		const airports = await AirportService.getAirports();
		SuccessReponse.data = airports;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getAirport(req, res) {
	try {
		const airport = await AirportService.getAirport(req.params.id);
		SuccessReponse.data = airport;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * DELETE : /airports/:id
 * req.params.id
 */
async function destroyAirport(req, res) {
	try {
		const airport = await AirportService.destroyAirport(req.params.id);
		SuccessReponse.data = airport;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

/**
 * UPDATE : /airports
 * req-body {name: 'IGI', code: 'DEL', address: '', cityId: 5}
 */
async function updateAirport(req, res) {
	try {
		const airport = await AirportService.updateAirport(
			req.body,
			req.params.id
		);
		SuccessReponse.data = airport;
		return res.status(StatusCodes.OK).json(SuccessReponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	createAirport,
	getAirports,
	getAirport,
	destroyAirport,
	updateAirport
};
