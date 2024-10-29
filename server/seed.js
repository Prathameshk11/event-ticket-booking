const mongoose = require('mongoose');
const Event = require('./models/Event');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

const seedEvents = [
  {
    title: "Summer Music Festival",
    description: "A day of amazing music featuring top artists from around the world. Enjoy live performances, food stalls, and a vibrant atmosphere.",
    date: new Date("2023-07-15"),
    location: "Central Park, New York",
    price: 59.99,
    availableTickets: 500,
    image: "https://example.com/summer-music-festival.jpg",
    category: "Music"
  },
  {
    title: "Tech Conference 2023",
    description: "Join industry leaders and innovators for a conference on the latest in technology. Featuring keynote speakers, workshops, and networking opportunities.",
    date: new Date("2023-08-10"),
    location: "Convention Center, San Francisco",
    price: 150.00,
    availableTickets: 300,
    image: "https://example.com/tech-conference.jpg",
    category: "Technology"
  },
  {
    title: "Food & Wine Expo",
    description: "Indulge in a culinary adventure with tastings from top chefs and wineries. Discover new flavors and culinary trends.",
    date: new Date("2023-09-05"),
    location: "Expo Center, Chicago",
    price: 75.00,
    availableTickets: 400,
    image: "https://example.com/food-wine-expo.jpg",
    category: "Food & Drink"
  },
  {
    title: "International Film Festival",
    description: "Experience the best of international cinema with screenings, Q&A sessions with directors, and film industry panels.",
    date: new Date("2023-10-20"),
    location: "Various Theaters, Toronto",
    price: 45.00,
    availableTickets: 1000,
    image: "https://example.com/film-festival.jpg",
    category: "Arts & Theater"
  },
  {
    title: "Marathon City Run",
    description: "Join thousands of runners in this annual city marathon. Suitable for all levels, from beginners to professional athletes.",
    date: new Date("2023-11-12"),
    location: "City Center, Boston",
    price: 80.00,
    availableTickets: 5000,
    image: "https://example.com/marathon-run.jpg",
    category: "Sports"
  },
  {
    title: "Business Leadership Summit",
    description: "A gathering of business leaders and entrepreneurs. Gain insights into leadership strategies and business innovation.",
    date: new Date("2023-12-05"),
    location: "Grand Hotel, London",
    price: 250.00,
    availableTickets: 200,
    image: "https://example.com/business-summit.jpg",
    category: "Business"
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert new events
    const insertedEvents = await Event.insertMany(seedEvents);
    console.log(`Inserted ${insertedEvents.length} events`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedDatabase();