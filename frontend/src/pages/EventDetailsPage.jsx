import React, { useReducer, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Components
import Spinner from '../components/Spinner/Spinner'

// Services
import { getEventById, bookEvent } from '../services/EventService';

// Actions
const SET_EVENT_ID = 'SET_EVENT_ID';
const SET_EVENT = 'SET_EVENT';
const CLEAR_EVENT = 'CLEAR_EVENT';



const EventDetails = (props) => {
    const [state, dispatch] = useReducer(eventDetailsReducer, { event: null, eventId: null });
    const authContext = useContext(AuthContext);

    const onBookEvent = async () => {
        if (!authContext.user) props.history.push('/auth');
        if (!state.event || !state.eventId) return;
        console.log('booking event...');
        const res = await bookEvent(state.eventId, authContext.user.token);
        console.log(res);
    }

    // cDM & params updated
    useEffect(() => {
        let didCancel = false;
        const { eventId } = props.match.params;
        if (state.eventId !== eventId) {
            dispatch({ type: SET_EVENT_ID, eventId });
            loadEventById(eventId);
        }

        async function loadEventById(eventId) {
            const res = await getEventById(eventId);
            if (didCancel) return;
            console.log(res);
            dispatch({ type: SET_EVENT, event: res.data.eventById });
        }

        // cWillUnmount
        return () => {
            didCancel = true;
        }

    }, [props.match.params.eventId]);


    // cDU & state.event was updated
    useEffect(() => {



    }, [state.event]);

    return (state.event) ? (
        <section>
            <h1>{state.event.title}</h1>
            <button onClick={onBookEvent}>Book Event</button>
        </section>
    ) : <Spinner />;
}


function eventDetailsReducer(state, action) {
    switch (action.type) {
        case SET_EVENT_ID:
            return {
                ...state,
                eventId: action.eventId
            };
        case SET_EVENT:
            return {
                ...state,
                event: action.event
            };
        case CLEAR_EVENT:
            return {
                ...state,
                event: null,
                eventId: null
            };
        default:
            return state;
    }
}

export default EventDetails;
