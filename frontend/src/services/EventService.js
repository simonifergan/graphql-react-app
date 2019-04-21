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
    try {
        const [status, data] = await APIPost(requestBody);
        if (status === 200) return data;
        else throw new Error('Problem');
    } catch (err) {
        console.log(err);
        return false;
    }
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
    try {
        const [status, data] = await APIPost(requestBody, token);
        if (status === 200) return data;
        else throw new Error('Problem');
    } catch (err) {
        console.log(err);
        return false;
    }
}
