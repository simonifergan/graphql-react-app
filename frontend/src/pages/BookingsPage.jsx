import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

// Components
import Spinner from '../components/Spinner/Spinner';

// Services
import { getBookingsByUserId } from '../services/EventService';

const BookingsPage = () => {
    // Context
    const authContext = useContext(AuthContext);

    // State
    const [bookings, setBookings] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // Lifecycle. cDM
    useEffect(() => {
        let didCancel = false;
        
        async function fetchData() {
            const { data } = await getBookingsByUserId('', authContext.user.token);
            if (didCancel) return;
            console.log(data);
            setBookings(data.bookings);
        }
        
        fetchData();
        return () => {
            didCancel = true;
        }

    }, [])

    // Lifecylce. cDU
    useEffect(() => {
        return () => {

        }
    }, [bookings])

    const bookingsList = bookings.map(booking => <li key={booking._id}>{booking.event.title}{booking.createdAt}</li>)

    return (
        <section>
            <h1>Hello Bookings Page</h1>
            <ul>
                {bookingsList}
            </ul>
        </section>
    );
}

export default BookingsPage;