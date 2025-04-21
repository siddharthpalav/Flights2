const { SuccessReponse, ErrorResponse } = require('../utils/common');
const { CityService } = require('../services');
const { StatusCodes } = require('http-status-codes');
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

module.exports = {
	createCity
};
