const User = require("../models/User.js")

const favoritesController = {
    getFavorites: async (req, res) => {
        const {userId} = req.params
        await User.findById({_id: userId})
        .then(user => res.status(200).send(user.favoriteItineraries))
        .catch(err => res.status(400).send(err))
    }
}

module.exports = favoritesController;