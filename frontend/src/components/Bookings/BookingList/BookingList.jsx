import React from 'react';

import BookingItem from '../BookingItem/BookingItem';
const BookingList = ({ bookings, cancelBooking, isProcessing, children }) => {
    const bookingList = bookings.map(booking => (
        (isProcessing === booking._id)? children: <BookingItem key={booking._id} booking={booking} cancelBooking={cancelBooking} />
    ));

    return (
        <ul className="booking-list">
            {bookingList}
        </ul>
    )
}

export default BookingList;