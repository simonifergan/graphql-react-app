import React from 'react';
import { Link } from 'react-router-dom'

import './EventItem.css'
import Event from '../../../assets/icons/event.svg'

export default React.memo(({ event }) => (
    <li className="EventItem">
        <img className="icon" src={Event} alt="Event icon"/>
        <Link title={`Go to "${event.title}" event page`} to={'/event/' + event._id}><h3>{event.title}</h3></Link>
        <p>Price: {event.price}</p>
        <p>At: {event.date}</p>
    </li>
));