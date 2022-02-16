const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

// controller
const users = require('../controllers/users');


router.route('/register')
    .get((req, res) => {
        res.render('users/register')
    })
    .post(catchAsync(users.registerUser))


router.route('/login')
    .get((req, res) => {
        res.render('users/login');
    })
    post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), users.loginUser)


router.get('/logout', users.logoutUser)


module.exports = router;