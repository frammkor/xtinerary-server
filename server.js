const   express     = require('express'),
        cors        = require('cors')
        bodyParser  = require('body-parser')
// para usar variables de entorno
require('dotenv').config()
// connection to Data Base
require('./functions/database.js')

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());

// PASSPORT
const passport = require('passport');
// Passport middleware
app.use(passport.initialize());
// Passport config
require('./auth/passport')//(passport);
// for google
const auth = passport.authenticate('jwt', {session: false})

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/img'));

app.use('/api/cities', require('./routes/routerCities'))
app.use('/api/itineraries', require('./routes/routerItineraries'))
app.use('/api/activities', require('./routes/routerActivities'))
app.use('/api/user', require('./routes/routerUser'))
app.use('/api/getFavorites', require('./routes/routerFavorites'));
app.use('/api/auth', require('./auth/authApi'));

app.listen(process.env.PORT, () => console.log('Listening on PORT ' + process.env.PORT));