const Activity = require("../models/Activity.js")

const ActivitiesController = {
    updateComment: async (req, res) => {
        const { activityId } = req.params;
        const { text, commentId } = req.body;
        Activity.findOneAndUpdate(
            {_id: activityId},
            {$set: {"comments.$[el].text": text } },
            { 
                arrayFilters: [{ "el.commentId": commentId }],
                new: true
            })
        .then(updatedActivity => res.status(200).send(updatedActivity.comments))
        .catch(err => console.log(err))
    },
    deleteComment: async (req, res) => {
        const { activityId } = req.params;
        const { text, userId, commentId } = req.body;
        Activity.findByIdAndUpdate(activityId, {$pull: {'comments':{text: text, userId: userId, commentId: commentId}}}, {new: true})
        .then(updatedActivity => res.status(200).send(updatedActivity.comments))
        .catch(err => console.log(err))
    },
    addComment: async (req, res) => {
        const { activityId } = req.params;
        Activity.findByIdAndUpdate(activityId, {$push: { comments: req.body }}, {new: true})
        .then(updatedActivity => {
            res.status(200).send(updatedActivity.comments)
        })
        .catch(err => console.log(err))
    },
    showActivitiesById: async (req, res) => {
        Activity.find( { itineraryId: req.params.itineraryId } )
        .then((data) => res.send(data))
        .catch(err => console.log(err))
    }
}
module.exports = ActivitiesController