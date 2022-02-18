const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 9;

        const camp = new Campground({
            author: '620a36b5cfcd637b6673e142',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sint nobis aut, quasi laudantium voluptas sunt ut aliquam necessitatibus numquam fugiat exercitationem nulla ab facere quaerat at molestiae consectetur voluptates!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dd0xcevbq/image/upload/v1644995233/YelpCamp/lga5fenisjevgqeddgyf.jpg',
                    filename: 'YelpCamp/lga5fenisjevgqeddgyf'
                },
                {
                    url: 'https://res.cloudinary.com/dd0xcevbq/image/upload/v1645085551/YelpCamp/Campground1_e9sgwt.avif',
                    filename: 'YelpCamp/Campground1_e9sgwt'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});