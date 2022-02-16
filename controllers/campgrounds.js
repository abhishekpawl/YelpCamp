const Campground = require('../models/campground');

const index = async(req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}

const createCampground = async(req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}

const showCampground = async(req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate({
      path: 'reviews',
      populate: {
          path: 'author'
      }
  }).populate('author');
  if (!campground) {
      req.flash('error', 'Cannot find that campground!');
      res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}

const editCampground = async(req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
      req.flash('error', 'Cannot find that campground!');
      res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
}

const updateCampground = async(req, res) => {
  const { id } = req.params;
  const tempCampground = await Campground.findById(id);
  if (!tempCampground) {
      req.flash('error', 'Cannot find that campground!');
      return res.redirect('/campgrounds');
  }
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground }, { new: true });
  req.flash('success', `Successfully updated ${campground.title}!`);
  res.redirect(`/campgrounds/${campground._id}`);
}

const deleteCampground = async(req, res) => {
  const { id } = req.params;
  const { title } = await Campground.findById(id);
  await Campground.findByIdAndDelete(id);
  req.flash('success', `Successfully deleted ${title}!`);
  res.redirect('/campgrounds');
}

module.exports = {
  index,
  createCampground,
  showCampground,
  editCampground,
  updateCampground,
  deleteCampground
}