const mongoose = require('mongoose');

const bookSlotSchema = mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref:'user'}],
    slotId: [{ type: mongoose.Schema.Types.ObjectId, ref:'slot'}],
    createdTime: { type: Date, default: Date.now }
});


module.exports = mongoose.model('bookingslots', bookSlotSchema);