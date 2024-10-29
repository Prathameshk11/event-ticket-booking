// updateEvents.js
const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const updateEvents = async () => {
  try {
    const events = await Event.find({});
    for (let event of events) {
      if (!event.category) {
        event.category = 'Uncategorized';
      }
      if (!event.time) {
        event.time = '00:00';
      }
      await event.save();
    }
    console.log('Events updated successfully');
  } catch (err) {
    console.error('Error updating events:', err);
  } finally {
    mongoose.disconnect();
  }
};

updateEvents();