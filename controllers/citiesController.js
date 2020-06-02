const City = require("../models/City")
const citiesController = {
    showCities: async (req, res) => {
        City.find()
        .then((data) => res.send(data))
        .catch(err => console.log(err));},
    createCity: async (req, res) => {
        const {city, country, about, quote} = req.body;
        const newCity = new City({city: city, country: country, about: about, quote: quote})
        await newCity.save().then(createdCity => res.status(200).send({"createdCity": createdCity}))
    },
    deleteCity: async (req, res) => {
        await City.findOneAndDelete({_id: req.params.cityId});
        res.json("Ciudad borrada")
    }
    // updateCity:
}
module.exports = citiesController