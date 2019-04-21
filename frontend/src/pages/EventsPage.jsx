import React, { useState } from 'react';

// Components
import Modal from '../components/Modal/Modal'
import EventEdit from '../components/Events/EventEdit/EventEdit'

const EventsPage = () => {

    const [isCreating, setIsCreating] = useState(false);

    const showModal = () => {
        setIsCreating(true);
    }

    const createEvent = (event) => {
        console.log('Create event:', event);

    }

    return (
        <React.Fragment>
            <Modal
                title="Add Event"
                canCancel
                canConfirm
                className="hi"
                isActive={isCreating}
                setActiveState={setIsCreating}
                confirmAction={() => {console.log('hi')}}
            >
                <EventEdit createEvent={createEvent} />
            </Modal>
            <section className="events-page">
                <button onClick={showModal}>Create Event</button>
                <h1>Hello Events Page</h1>
            </section>
        </React.Fragment>
    );
}

export default EventsPage;