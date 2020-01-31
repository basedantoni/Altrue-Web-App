const express = require('express');
const router = express.Router();

const Event = require("../../models/Event")

// @route POST api/event/createEvent
// @desc Create an event
// @access Public
router.post('/createEvent', (req, res) => {
    const newEvent = new Event({
      name: req.body.eventName,
      date: req.body.date,
      location: req.body.location,
      organization: req.body.organization
    });
  
    newEvent
      .save()
      .then(events => res.json(events))
      .catch(err => { res.status(400).json({ success: false })});
});

// @route GET api/event/
// @desc Get all events
// @access Public
router.get('/', (req, res) => {
    Event.find()
      .sort({date: -1})
      .then(events => res.json(events));
  });

module.exports = router;