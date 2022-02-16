const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const flash = require('connect-flash');
const { isLoggedIn, validateCampground, isAuthorized } = require('../middleware');

// controller
const campgrounds = require('../controllers/campgrounds');


router.route('/')
    .get(catchAsync(campgrounds.index))
    post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthorized, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthorized, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(campgrounds.editCampground))


module.exports = router;