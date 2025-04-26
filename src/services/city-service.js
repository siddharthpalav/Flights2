const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
	try {
		const city = await cityRepository.create(data);
		return city;
	} catch (error) {
		if (
			error.name === 'SequelizeValidationError' ||
			error.name === 'SequelizeUniqueConstraintError'
		) {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			'Cannot create a new City object',
			StatusCodes.BAD_REQUEST
		);
	}
}

async function getCities() {
	try {
		const cities = await cityRepository.getAll();
		return cities;
	} catch (error) {
		throw new AppError(
			'Cannot fetch data of all the cities',
			StatusCodes.BAD_REQUEST
		);
	}
}

async function getCity(id) {
	try {
		const city = await cityRepository.get(id);
		return city;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				`The city you requested is not present`,
				StatusCodes.NOT_FOUND
			);
		}
		throw new AppError(
			'Cannot fetch data of all the cities',
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyCity(id) {
	try {
		const response = await cityRepository.destroy(id);
		return response;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				'The city you request is not present',
				StatusCodes.NOT_FOUND
			);
		}
		throw new AppError(
			'Cannot fetch data of the city',
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function updateCity(data, id) {
	try {
		const response = await cityRepository.update(data, id);
		return response;
	} catch (error) {
		throw new AppError(
			'The city you want to update is not present',
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = { createCity, getCities, getCity, destroyCity, updateCity };
