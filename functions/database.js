const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost:27017/test', {
mongoose
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB!"))
    .catch(err => console.log("ERROR", err.message));

// const connection = mongoose.connection
// connection.once('open', () => console.log("Connected to DB!");

