const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', {campgrounds});
})

app.post('/campgrounds', async (req, res, next) => {
  try {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  } catch(e) {
    next(e);
  }
})

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

app.get('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/show', {campground});
})

app.get('/campgrounds/:id/edit', async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/edit', {campground});
})

app.put('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new: true});
  res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
})

app.use((err, req, res, next) => {
  res.send('SOMETHING WENT WRONG!');
})

app.listen(3000, () => {
  console.log(`SERVER LISTENING ON PORT:3000...`);
})