import { APIPost } from './GraphQLService';

export const login = async credentials => {
    const requestBody = {
        query: `
            query {
                login(
                    email: "${credentials.email}",
                    password: "${credentials.password}"
                ) {
                    userId,
                    token,
                    tokenExpiration
                }
            }
        `
    };

    const [status, data] = await APIPost(requestBody);
    console.log('status', status, 'data', data);
    return data;
}

export const signup = async credentials => {
    const requestBody = {
        query: `
            mutation {
                signup(userInput: {
                    email: "${credentials.email}",
                    password: "${credentials.password}",
                }) {
                    _id,
                    email
                }
            }
        `
    };

    const [status, data] = await APIPost(requestBody);
    console.log('status', status, 'data', data);
    return data;
}