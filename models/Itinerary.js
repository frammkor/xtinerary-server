const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    authorId: {
        type: String
    },
    stars: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    hashtags: {
        type: Array,
        default: []
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

Itinerary = mongoose.model("Itinerary", ItinerarySchema);

module.exports = Itinerary;
