const   passport        = require('passport'),
        GoogleStrategy  = require('passport-google-oauth20').Strategy
let User = require('../models/User')

// aqui dentro pegar los datos del JSON de google cloud 
passport.use(new GoogleStrategy({
    clientID: '412331161010-oa03r6vfe5h7pntvc59a5h20oj7uh11o.apps.googleusercontent.com',
    clientSecret: 'e3pF6Ts2dMkc5BFfmM7wzoH1',
    callbackURL: 'http://localhost:8080/api/auth/google/callback'
},
    function(accessToken, refreshToken, profile, cb) {
        cb(null,profile)
    }
))