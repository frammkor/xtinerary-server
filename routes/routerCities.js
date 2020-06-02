const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/citiesController');

router.route('/')
.get(citiesController.showCities)
.post(citiesController.createCity)

router.route('/:cityId')
.delete(citiesController.deleteCity)
// .put(citiesController.updateCity)

module.exports = router