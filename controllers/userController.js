const User = require("../models/User");
// npm i jsonwebtoken
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const keys = require('./secretKey');

// Load input validation
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

const userController = {
    loginGoogle: async (googleUserInfo, res) => {
    User
    .findOne({email: googleUserInfo.email})
    .then(user => {
        if (user) {
            // User matched Create JWT Payload
            const payload = {
                id: user.id,
                userName: user.userName
            }
            // Sing token
            jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 31556926 // 1 year in seconds
            }, (err, token) => {
                res.redirect('http://localhost:3000/handleGoogleLogin/'+token)
            });
        } else {
            // register user with google credentials
            const newUser = new User({userName: googleUserInfo.userName, email: googleUserInfo.email, password: googleUserInfo.password});
            // Hash password before saving in data base || with bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) 
                        throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            console.log(user)
                            const payload = {
                                id: user.id,
                                userName: user.userName
                            }
                            // Sing token
                            jwt.sign(payload, keys.secretOrKey, {
                                expiresIn: 31556926 // 1 year in seconds
                            }, (err, token) => {
                                res.redirect('http://localhost:3000/handleGoogleLogin/'+token)
                            });
                        })
                        .catch(err => console.log(err));
                });
            })
        }
    })
    .catch(err => console.log(err));
    },
    login: async (req, res) => {
        /*
        - Pull the errors and isValid variables from our validateLoginInput function and check input validation
        - If valid input, use MongoDB's User.findOne() to see if the user exists
        - If user exist,u se bcryptjs to compare submitted password with hashed password in our database
        - If passwords match, create our JWT Payload
        - Sing our jwt , including our payload, keys.secretOrKey rom keys.js, and setting a expiresIn time(in seconds)
        - If successful, append the token to a Bearer string (remember our passport.js file, we set opts.jwtFromRequest = ExtractJwt.fromAuthHeadersAsBearerToken();)
        */
        const {errors, isValid} = validateLoginInput(req.body);
        // Check Validation
        if (!isValid) {
            return res
                .status(400)
                .json(errors);
        }
        const nameOrEmail = req.body.nameOrEmail;
        const password = req.body.password;
        // Find user by user name
        User.findOne({
            $or: [
                {
                    email: nameOrEmail
                }, {
                    userName: nameOrEmail
                }
            ]
        }).then(user => {
            // Check if user exist
            console.log(user)
            if (!user) {
                return res
                    .status(404)
                    .json({emailnotfound: "User not found"});
            }
            // Check password
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched Create JWT Payload
                        const payload = {
                            id: user.id,
                            userName: user.userName
                        }
                        // Sing token
                        jwt.sign(payload, keys.secretOrKey, {
                            expiresIn: 31556926 // 1 year in seconds
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res
                            .status(400)
                            .json({passwordincorrect: "Password incorrect"});
                    }
                })
        }).catch(err => console.log(err))
    },
    register: async (req, res) => {
        /*
        - Pull the errors and isValid variables from our validateRegisterInput function and check input validation
        - If valid input, use MongoDB's User.findOne() to see if the user already exists
        - If user is a new user, fill in the fields (name, email, password) with data sent in the body of the request
        - User bcrypt.js to hash the password before storing it in your data base
        */
        const {errors, isValid} = validateRegisterInput(req.body);
        // check validation
        if (!isValid) {
            return res
                .status(400)
                .json(errors);
        }
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    return res
                        .status(400)
                        .json({email: 'Email already exists'});
                } else {
                    const newUser = new User({userName: req.body.userName, email: req.body.email, password: req.body.password});
                    // Hash password before saving in data base || with bcrypt
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) 
                                throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        });
                    })
                }
            })
            .catch(err => console.log(err));
    }
}
module.exports = userController