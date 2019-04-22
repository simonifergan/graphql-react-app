const dataLoader = require('dataloader');

const Event = require('../../models/event');
const User = require('../../models/user');

const eventLoader = new dataLoader(eventIds => {
    return events(eventIds);
})

const userLoader = new dataLoader(userIds => {
    return User.find({ _id: { $in: userIds } })
})

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => transformEvent(event));
    } catch (err) {
        throw err;
    }

}

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: eventLoader.loadMany.bind(this, ...user._doc.createdEvents)
        }
    } catch (err) {
        throw err;
    }
}


const singleEvent = async eventId => {
    try {
        const event = await eventLoader.load(eventId.toString());
        return event;
    } catch (err) {
        throw err;
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        user: user.bind(this, event.user),
    }
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
    }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;