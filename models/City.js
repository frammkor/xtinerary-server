const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema

// SCHEMA SETUP
const citySchema = new Schema({
    city: String,
    country: String,
    itinerariesAmount: { type: Number, default: 0 },
    about: String,
    quote: String
});
// el primer argumento es el nombre de la coleccion y en el segundo paso el esquema definido por mi
const City = mongoose.model("City", citySchema);

module.exports = City