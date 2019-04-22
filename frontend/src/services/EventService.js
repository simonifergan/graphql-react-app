import { APIPost } from './GraphQLService';


export const queryEvents = async () => {
    const requestBody = {
        query: `
            query {
                events {
                    _id
                    title
                    description
                    price
                    date
                    user {
                        _id
                        email
                    }
                }
            }
        `
    };

    const data = await APIPost(requestBody);
    return data;

}

export const getEventById = async (eventId) => {
    const requestBody = {
        query: `
            query {
                eventById(eventId: "${eventId}") {
                    _id,
                    title,
                    description,
                    user {
                        _id,
                        email
                    }
                }
            }
        `
    };

    const data = await APIPost(requestBody);
    return data;
}

export const bookEvent = async (eventId, token) => {
    const requestBody = {
        query: `
            mutation {
                bookEvent(eventId: "${eventId}") {
                    _id,
                    createdAt,
                    updatedAt,
                    user {
                        _id
                    }
                }
            }
        `
    };

    const data = await APIPost(requestBody, token);
    return data;
}

export const cancelBooking = async (bookingId, token) => {
    const requestBody = {
        query: `
            mutation {
                cancelBooking(bookingId: "${bookingId}") {
                    _id
                    title
                }
            }
        `
    }

    const data = await APIPost(requestBody, token);
    return data;
}

export const getBookingsByUserId = async (userId, token) => {
    const requestBody = {
        query: `
            query {
                bookings {
                    _id
                    createdAt,
                    updatedAt,
                    event {
                        _id,
                        title,
                        date,
                        price
                    }
                }
            }
        `
    };

    const data = await APIPost(requestBody, token);
    return data;
}

export const createEvent = async (event, token) => {
    const requestBody = {
        query: `
            mutation {
                createEvent(eventInput: {
                    title: "${event.title}",
                    description: "${event.description}",
                    date: "${event.date}",
                    price: ${event.price},
                }) {
                    _id,
                    title,
                    description,
                    price,
                    date,
                    user {
                    _id,
                    email
                    }
                }
                }
        `
    };

    const data = await APIPost(requestBody, token);
    return data;

}
