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


router.get('/', catchAsync(campgrounds.index))


router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})


router.get('/:id', catchAsync(campgrounds.showCampground))


router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(campgrounds.editCampground))


router.put('/:id', isLoggedIn, isAuthorized, validateCampground, catchAsync(campgrounds.updateCampground))


router.delete('/:id', isLoggedIn, isAuthorized, catchAsync(campgrounds.deleteCampground))


module.exports = router;