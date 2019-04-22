import { APIPost } from './GraphQLService';

export const login = async (credentials) => {
    const requestBody = {
        query: `
            query Login($email: String!, $password: String!) {
                login(
                    email: $email,
                    password: $password
                ) {
                    userId,
                    token,
                    tokenExpiration
                }
            }
        `,
        variables: {
            ...credentials
        }
    };


    const data = await APIPost(requestBody);
    return data;

}

export const signup = async (credentials) => {
    const requestBody = {
        query: `
            mutation Signup($email: String!, $password: String!) {
                signup(userInput: {
                    email: $email,
                    password: $password,
                }) {
                    _id,
                    email
                }
            }
        `,
        variables: {
            ...credentials
        }
    };

    const data = await APIPost(requestBody);
    return data;
}