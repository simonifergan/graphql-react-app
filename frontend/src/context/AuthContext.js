import React from 'react';

export default React.createContext({
    token: '',
    userId: '',
    tokenExpiration: null,
    login: () => {},
    logout: () => {}
})