const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./merge.resolvers');


module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => transformEvent(event));
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new Event({
            user: req.userId,
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: args.eventInput.date,
        });
        try {
            const newEvent = await event.save();
            const eventCreator = await User.findById(req.userId);
            if (!eventCreator) throw 'User not found';
            else {
                eventCreator.createdEvents.push(newEvent._doc);
                await eventCreator.save();
            }
            return transformEvent(newEvent);
        } catch (err) {
            throw err;
        }

    },

}