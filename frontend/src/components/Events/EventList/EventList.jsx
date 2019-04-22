import React from 'react';

import EventItem from '../EventItem/EventItem';
const EventList = ({events}) => {
    const eventList = events.map(event => <EventItem key={event._id} event={event}/>);
    return (
        <ul>
            {eventList}
        </ul>
    )
}

export default EventList;