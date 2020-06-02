const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema

// SCHEMA SETUP
const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    country: String,
    profilePic: String,
    favoriteItineraries: Array
});
const User = mongoose.model("User", userSchema);

module.exports = User