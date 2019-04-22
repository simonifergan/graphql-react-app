import React from 'react';
import { Link } from 'react-router-dom'

export default ({ booking, cancelBooking }) => {

    const onCancel = () => cancelBooking(booking._id);

    return (
        <li>
            <Link to={'/event/' + booking.event._id}><h3>{booking.event.title}</h3></Link>
            <p>Price: {booking.event.price}</p>
            <p>At: {booking.event.date}</p>
            <button onClick={onCancel}>Cancel</button>
        </li>
    );

}