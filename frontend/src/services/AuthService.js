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

    try {
        const [status, data] = await APIPost(requestBody);
        if (status === 200) return data;
        else throw new Error('Problem');
    } catch {
        return false;
    }
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

    try {
        const [status, data] = await APIPost(requestBody);
        if (status === 200) return data;
        else throw new Error('Problem');
    } catch {
        return false;
    }
}