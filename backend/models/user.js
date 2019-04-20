const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersCollection = 'users';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('User', userSchema, usersCollection);