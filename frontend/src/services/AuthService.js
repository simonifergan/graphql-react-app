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


    const data = await APIPost(requestBody);
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

    const data = await APIPost(requestBody);
    return data;
}