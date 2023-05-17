const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeline: {
        day: {type: String, required: true},
        startDate: {type: String, required: true},
        startTime: {type: String, required: true},
        endDate: {type: String, required: true},
        endTime: {type: String, required: true},
        venue: {type: String}
    },
    photo: { //URL of picture
        type: String
    },
    buttonlink : { //GDSC Community link (RSVP)
        type: String
    },
    tenure: {
        type: String,
        required: true
    },
    domains: [{
        type : String,
        enum: ["WebDev", "AiMl", "AppDev", "GameDev"],
        required: true
    }],
    speakers: [{
        type: String
    }],
    facilitators: [{
        type: String
    }]
});



const Event = mongoose.model('Event', eventSchema);

module.exports = Event;