export const APIPost = async requestBody => {
    const res = await fetch('http://localhost:3003/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (res.status === 200) {
        const data = await res.json();
        return [res.status, data];
    } else return [res.status, false];
}