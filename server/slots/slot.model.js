const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    slotDate: {
        type: Date,
        required: true,
    },
    fromTime: {
        type: String,
    },
    toTime: {
        type: String,
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('slot', slotSchema);