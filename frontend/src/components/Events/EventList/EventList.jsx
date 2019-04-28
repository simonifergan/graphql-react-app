import React from 'react';
import './EventList.css'

import EventItem from '../EventItem/EventItem';

const EventList = ({events}) => {
    const eventList = events.map(event => <EventItem key={event._id} event={event}/>);
    return (
        <ul className="EventList">
            {eventList}
        </ul>
    )
}

export default EventList;