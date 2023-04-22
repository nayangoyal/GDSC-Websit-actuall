const router = require('express').Router();
let Event = require('../models/event.model');


router.route('/events/fetchall').get( async(req, res) => {
    await Event.find()
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: '+err));
});


router.route('/events').post(async(req, res) => {
    
  try{
      const { name, description, timeline,tenure, domain, speaker, facilitator } = req.body;
      const newEvent = new Event({
        name,
        description,
        timeline,
        tenure,
        domain,
        speaker,
        facilitator
      });

      await newEvent.save()

      res.status(201).json(newEvent);
    
  }catch(error) {
      res.status(500).json({ error: error.message });
  }
});

router.route('/').get(async (req, res) => {
  try {
    const { year, domain } = req.query;
    let filter = {};

    if (year) {
      filter.$and = [
        { 'timeline.startDate': { $gte: `${year}-03-01` } }, // Greater than or equal to start year
        { 'timeline.endDate': { $lte: `${parseInt(year) + 1}-03-01` } } // Less than or equal to end year
      ];
    }


    if (domain) {
      const domains = domain.split(',');
      filter.domain = { $in: domains };
    }

    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;