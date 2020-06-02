const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

router.route('/:userId')
.get(favoritesController.getFavorites)

module.exports = router