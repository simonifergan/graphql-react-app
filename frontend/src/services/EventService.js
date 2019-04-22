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
            mutation CancelBooking($id: ID!) {
                cancelBooking(bookingId: $id) {
                    _id
                    title
                }
            }
        `,
        variables: {
            id: bookingId
        }
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
            mutation CreateEvent($title: String!, $description: String!, $date: String!, $price: Float!) {
                createEvent(eventInput: {
                    title: $title,
                    description: $description,
                    date: $date,
                    price: $price,
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
        `,
        variables: {
            ...event
        }
    };

    const data = await APIPost(requestBody, token);
    return data;

}
