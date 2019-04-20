const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventsCollection = 'events';

const eventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Event', eventSchema, eventsCollection)