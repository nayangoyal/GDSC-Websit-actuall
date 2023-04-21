const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const upcomingeventSchema = new Schema({
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
        endTime: {type: String, required: true}
    },
    tenure: {
        type: String,
        required: true
    },
    speaker: {
        type: String,
        
    },
    facilitator: {
        type: String,
    },
});



const UpcomingEvent = mongoose.model('UpcomingEvent', upcomingeventSchema);

module.exports = UpcomingEvent;