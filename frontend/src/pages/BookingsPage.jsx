import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const BookingsPage = () => {

    const authContext = useContext(AuthContext);

    return (authContext.user && authContext.user.token) ? (
        <section>
            <h1>Hello Bookings Page</h1>
        </section>
    ) : <Redirect to="/auth" />;
}

export default BookingsPage;