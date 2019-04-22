import React from 'react';
import { Link } from 'react-router-dom'

export default React.memo(({ event }) => (
    <li>
        <Link to={'/event/' + event._id}><h3>{event.title}</h3></Link>
        <p>Price: {event.price}</p>
        <p>At: {event.date}</p>
    </li>
));