export const APIPost = async (requestBody, token = '') => {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    console.log(token);
    const res = await fetch('http://localhost:3003/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers,
    });
    if (res.status === 200) {
        const data = await res.json();
        return [res.status, data];
    } else return [res.status, false];
}