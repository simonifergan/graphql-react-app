import React from 'react';

import BookingItem from '../BookingItem/BookingItem';
const BookingList = ({ bookings, cancelBooking, isProcessing, children }) => {
    const bookingList = bookings.map(booking => (
        (isProcessing === booking._id) ? children : <BookingItem key={booking._id} booking={booking} cancelBooking={cancelBooking} />
    ));

    return (
        <article>
            <h1>Your bookings:</h1>
            <ul className="booking-list">
                {bookingList}
            </ul>
        </article>

    )
}

export default BookingList;