const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

router.route('/showActivitiesById/:itineraryId')
.get(activitiesController.showActivitiesById)

router.route('/addCommentTo/:activityId')
.put(activitiesController.addComment)

router.route('/deleteCommentFrom/:activityId')
.put(activitiesController.deleteComment)

router.route('/updateCommentFrom/:activityId')
.put(activitiesController.updateComment)

module.exports = router