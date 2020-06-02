const express = require('express');
const router = express.Router();
const itinerariesController = require('../controllers/itinerariesController');

router.route('/')
// .get(itinerariesController.showItineraries)
// .post(itinerariesController.createItinerary)

router.route('/favorite/:userId/:itineraryId')
.put(itinerariesController.addToUserFavorite)

router.route('/:cityId')
.get(itinerariesController.showByCityId)
.post(itinerariesController.newItinerary)
// .delete(itinerariesController.deleteById)
// .put(itinerariesController.updateItineraries)

module.exports = router