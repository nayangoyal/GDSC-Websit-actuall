const router = require("express").Router();
let Event = require("../models/event.model");

// http://localhost:8000/events/all
router.route("/all").get(async (req, res) => {
  await Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

// http://localhost:8000/events/
router.route("/").post(async (req, res) => {
  try {
    const {
      name,
      description,
      timeline,
      photo,
      buttonlink,
      tenure,
      domains,
      speakers,
      facilitators,
    } = req.body;
    const newEvent = new Event({
      name,
      description,
      timeline,
      photo,
      buttonlink,
      tenure,
      domains,
      speakers,
      facilitators,
    });

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  // try {
  //   const { year, domain } = req.query;
  //   let filter = {};

  //   if (year) {
  //     filter.$and = [
  //       { "timeline.startDate": { $gte: `${year}-03-01` } }, // Greater than or equal to start year
  //       { "timeline.endDate": { $lte: `${parseInt(year) + 1}-03-01` } }, // Less than or equal to end year
  //     ];
  //   }

  //   if (domain) {
  //     const domains = domain.split(",");
  //     filter.domain = { $in: domains };
  //   }

  //   const events = await Event.find(filter);
  //   res.json(events);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: error.message });
  // }
});

module.exports = router;
