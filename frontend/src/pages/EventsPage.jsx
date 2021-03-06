import React, { useState, useReducer, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

// Components
import EventList from '../components/Events/EventList/EventList';
import Modal from '../components/Modal/Modal';
import EventEdit from '../components/Events/EventEdit/EventEdit';
import Spinner from '../components/Spinner/Spinner';
import BackButton from '../components/BackButton/BackButton';

// Services
import { queryEvents, createEvent } from '../services/EventService';

// Actions:
const SET_EVENTS = 'SET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';

const EventsPage = ({history}) => {
    // Context
    const authContext = useContext(AuthContext);

    // State
    const [events, dispatch] = useReducer(eventsReducer, []);
    const [isCreating, setIsCreating] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    // Methods
    const showModal = () => {
        setIsCreating(true);
    }

    const onCreateEvent = async (event) => {
        setIsFetching(true);
        const res = await createEvent(event, authContext.user.token);
        if (res) {
            dispatch({type: ADD_EVENT, event: res.data.createEvent})
            setIsCreating(false);
        }
        setIsFetching(false);
    }

    // Lifecycle. cDM
    useEffect(() => {
        let didCancel = false;
        async function fetchData() {
            const { data } = await queryEvents();
            if (didCancel) return;
            dispatch({type: SET_EVENTS, events: data.events})
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
    }, [events])

    return (
        <React.Fragment>
            <BackButton goBack={history.goBack}/>
            <Modal
                title="Add Event"
                canCancel
                canConfirm
                className="hi"
                isActive={isCreating}
                setActiveState={setIsCreating}
                confirmAction={() => { console.log('hi') }}
            >
                {(isFetching) ? <Spinner /> : <EventEdit createEvent={onCreateEvent} />}
            </Modal>
            <section className="events-page">
                {authContext.user && <button onClick={showModal}>Create Event</button>}
                <h1>Upcoming Events</h1>
                <EventList events={events} />
            </section>
        </React.Fragment>
    );
}

function eventsReducer(events, action) {
    switch (action.type) {
        case SET_EVENTS:
            return action.events
        case ADD_EVENT:
            return [action.event, ...events]
        case REMOVE_EVENT:
            return events.filter(event => event._id !== action.eventId)
        default:
            return events;
    }
}

export default EventsPage;