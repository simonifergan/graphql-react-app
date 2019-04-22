import React, { useState, useReducer, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

// Components
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BackButton from '../components/BackButton/BackButton';

// Services
import { getBookingsByUserId, cancelBooking } from '../services/EventService';

// Actions
const SET_BOOKINGS = 'SET_BOOKINGS';
const CANCEL_BOOKING = 'CANCEL_BOOKING';

const BookingsPage = ({history}) => {
    
    // Context
    const authContext = useContext(AuthContext);

    // State
    const [bookings, dispatch] = useReducer(bookingsReducer, []);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCancelBooking = async (bookingId) => {
        setIsProcessing(bookingId);
        await cancelBooking(bookingId, authContext.user.token);
        dispatch({ type: CANCEL_BOOKING, bookingId });
    }

    // Lifecycle. cDM
    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
            const { data } = await getBookingsByUserId('', authContext.user.token);
            if (didCancel) return;
            console.log(data);
            dispatch({ type: SET_BOOKINGS, bookings: data.bookings });
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


    return (
        <React.Fragment>
            <BackButton goBack={history.goBack}/>
            <section>
                <h1>Hello Bookings Page</h1>
                <ul>
                    <BookingList bookings={bookings} cancelBooking={onCancelBooking} isProcessing={isProcessing}>
                        <Spinner />
                    </BookingList>
                </ul>
            </section>
        </React.Fragment>
    );
}

function bookingsReducer(bookings, action) {
    switch (action.type) {
        case SET_BOOKINGS:
            return action.bookings
        case CANCEL_BOOKING:
            return bookings.filter(event => event._id !== action.bookingId)
        default:
            return bookings;
    }
}

export default BookingsPage;