const Itinerary = require("../models/Itinerary.js")
const User = require("../models/User.js")

const itinerariesController = {
    newItinerary: async (req, res) => {
        const {title, description, author, authorId, duration, price, hashtags, cityId} = req.body;
        const newItinerary = new Itinerary({title, description, author, authorId, duration, price, hashtags, cityId})
        await newItinerary.save().then(createdItinerary => {
            res.status(200).send({createdItinerary});
        })
        .catch(err => console.log(err))
    },
    showByCityId: async (req, res) => {
        Itinerary
            .find({cityId: req.params.cityId})
            .then(itineraries => res.status(200).send(itineraries))
            .catch(err => console.log(err))
    },
    addToUserFavorite: async (req, res) => {
        let updatedInfo = {
            stars: '',
            favoriteList: []
        };
        const {itineraryId, userId} = req.params
        // look if the user has already this itinerary saved
        await User.findById({_id: userId})
        .then(async user => {
            // if he has it, remove it 
            if (user.favoriteItineraries.includes(itineraryId)) {
                User.findByIdAndUpdate(userId, {$pull: { favoriteItineraries: itineraryId }}, {new: true})
                .then(updatedUser => {
                    updatedInfo.favoriteList = updatedUser.favoriteItineraries;
                    // and subtract 1 to the itineraries "stars" entry
                    Itinerary.findOneAndUpdate({"_id": itineraryId}, {$inc: {"stars": -1}}, {new: true})
                    // const updatedItinerary = await Itinerary.findByIdAndUpdate(itineraryId, {$inc: {"stars": -1}},{new: true})
                    .then(updatedItinerary => {
                        updatedInfo.stars = updatedItinerary.stars;
                        res.status(200).send(updatedInfo);
                    })
                    .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))
            } else {
                // if he dos not, add it
                User.findByIdAndUpdate(userId, {$push: { favoriteItineraries: itineraryId }}, {new: true}/*,(err) => {if(err){res.status(400).send(err)}}*/)
                .then(updatedUser => {
                    updatedInfo.favoriteList = updatedUser.favoriteItineraries;
                    // and subtract 1 to the itineraries "stars" entry
                    Itinerary.findOneAndUpdate({"_id": itineraryId}, {$inc: {"stars": 1}}, {new: true})
                    .then(updatedItinerary => {
                        updatedInfo.stars = updatedItinerary.stars;
                        res.status(200).send(updatedInfo);
                    })
                    .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))
            }
        })
        .catch(err => res.status(400).send(err))
    }
}
module.exports = itinerariesController;