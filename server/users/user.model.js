const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    profilePic: {
        type: String
    },
    contactNo:{
        type: Number,
        required:true
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', slotSchema);