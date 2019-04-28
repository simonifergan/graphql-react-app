import React, { useReducer, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Components
import Spinner from '../components/Spinner/Spinner';
import BackButton from '../components/BackButton/BackButton';

// Services
import { getEventById, bookEvent } from '../services/EventService';

// Actions
const SET_EVENT_ID = 'SET_EVENT_ID';
const SET_EVENT = 'SET_EVENT';
const CLEAR_EVENT = 'CLEAR_EVENT';
const TOGGLE_IS_BOOKING = 'TOGGLE_IS_BOOKING';



const EventDetails = (props) => {
    const [state, dispatch] = useReducer(eventDetailsReducer, { event: null, eventId: null, isBooking: false });
    const authContext = useContext(AuthContext);

    const onBookEvent = async () => {

        if (!authContext.user) props.history.push('/auth');
        if (!state.event || !state.eventId) return;
        dispatch({ type: TOGGLE_IS_BOOKING });
        const res = await bookEvent(state.eventId, authContext.user.token);
        if (res) dispatch({ type: TOGGLE_IS_BOOKING });
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

    return (
        <React.Fragment>
            <BackButton goBack={props.history.goBack} />
            {(state.event) ? (
                <section>
                    <h1>{state.event.title}</h1>
                    <p>{state.event.description}</p>
                    {authContext.user ? <button disabled={state.isBooking} onClick={onBookEvent}>Book Event</button> : null}
                </section>
            ) : <Spinner />}
        </React.Fragment>
    )
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
        case TOGGLE_IS_BOOKING:
            return {
                ...state,
                isBooking: !state.isBooking
            };
        default:
            return state;
    }
}

export default EventDetails;
