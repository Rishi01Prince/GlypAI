const express = require('express')
const user = express.Router();
const authRoute = require("./auth");
const passport = require('./passport');
const {CreateUser, loginUser , isValidCredentials , getAllUsers} = require('./User_Methods');
user.use(passport.initialize());
user.use(passport.session());

user.route('/')
    .get(getAllUsers)

user
    .route('/login')
    .post(isValidCredentials, loginUser);

user
    .route('/createuser')
    .post(isValidCredentials , CreateUser);

    

user.use('/auth' , authRoute)
// '/user/auth/google/callback'

module.exports = user;