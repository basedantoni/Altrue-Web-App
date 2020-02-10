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
    let eventList = []
    Event.find()
      .sort({date: -1})
      .then(events => {
          events.forEach(element => {
            eventList.push({
                eventName: element.name,
                date: element.date,
                location: element.location,
                organization: element.organization
            })
          });
          return res.json(eventList)
      });
  });

router.get("/calendarEvents/:date", (req, res) => {
  // Converts default Javascript date to ISO
  const date = new Date(req.params.date)

  // Increments date with object Date.setDate && Date.getDate
  let nextDay = new Date(req.params.date)
  nextDay.setDate(date.getDate() + 1)

  Event.find({ 
    date: {
      $gte: date,
      $lte: nextDay
    }
  })
  .then(events => {
    return res.json(events)
  })
})

module.exports = router;