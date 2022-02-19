const User = require('../models/user');
const passport = require('passport');

const registerUser = async(req, res, next) => {
  try {
      const { email, username, password } = req.body;
      const user = new User({
          email,
          username
      });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
          if (err) {
              return next(err);
          }
          req.flash('success', 'Welcome to Yelp Camp!');
          res.redirect('/campgrounds');
      })
  } catch (e) {
      req.flash('error', 'Username or email already exists!');
      res.redirect('register');
  }
}

const loginUser = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectTo = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}

const logoutUser = (req, res) => {
  req.logOut();
  req.flash('success', 'Goodbye!');
  res.redirect('/');
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}