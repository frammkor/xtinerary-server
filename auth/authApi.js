const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    userController = require('../controllers/userController')
require('./passport-google')

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: false
}), async function (req, res) {
    const googleUserInfo = {
        userName: req.user.displayName,
        email: req.user.emails[0].value,
        password: req.user.id
    }
    userController.loginGoogle(googleUserInfo, res)
})

module.exports = router;