const router = require('express').Router();
let PastEvent = require('../models/pastevent.model');
let UpcomingEvent = require('../models/upcomingevent.model');

router.route('/events/upcoming').get( async(req, res) => {
    await UpcomingEvent.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error-upcoming: '+err));
});


router.route('/events/past').get( async(req, res) => {
    await PastEvent.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error-past: '+err));
});


router.route('/events').post(async(req, res) => {
    
  try{
      const { name, description, timeline, tenure, speaker, facilitator } = req.body;
      const newEvent = new UpcomingEvent({
        name,
        description,
        timeline,
        tenure,
        speaker,
        facilitator
      });

      // Save the new event to the database
      await newEvent.save()
    
      // Send the created event object as response
      res.status(201).json(newEvent);
    
  }catch(error) {
      // Handle any errors that occurred during saving
      res.status(500).json({ error: error.message });
  }
});



const checkAndUpdateEvents = async () => {
  try {
    const currentTime = new Date(); // Get the current time

    // Find upcoming events that have ended based on the current time
    const upcomingEvents = await UpcomingEvent.find({
      'timeline.endDate': { $lt: currentTime }
    });

    // Convert upcoming events into past events and update their tenure
    for (const upcomingEvent of upcomingEvents) {
      const pastEventData = { ...upcomingEvent.toObject(), tenure: 'past' }; // Create past event data with updated tenure
      const pastEvent = new PastEvent(pastEventData); // Create a new past event document
      await pastEvent.save(); // Save the past event document
      await UpcomingEvent.findByIdAndDelete(upcomingEvent._id); // Delete the upcoming event document
    }

    console.log(`${upcomingEvents.length} upcoming events converted to past events.`); // Log the number of events converted
  } catch (error) {
    console.error('Error converting upcoming events to past events:', error);
  }
};

// Run the function every minute
setInterval(checkAndUpdateEvents, 60000);




router.route('/past/events/:startYear').get(async (req, res) => {

  const startYear = req.params.startYear;;
// const endYear = req.params.endYear;

  PastEvent.find({
    $and: [
      { 'timeline.startDate': { $gte: `${startYear}-03-01` } }, // Greater than or equal to start year
      { 'timeline.endDate': { $lte: `${startYear+1}-03-01` } } // Less than or equal to end year
    ]
  })
  .then(events => {
    console.log('Events between range:', events);
    // Process the events as needed
    res.json(events);
  })
  .catch(error => {
    console.error(error);
  })
});

module.exports = router;