import React, { useState } from 'react';

import './EventEdit.css'

const EventEdit = ({createEvent, onCancel}) => {

    const title = useFormInput('');
    const description = useFormInput('');
    const price = useFormInput(0);
    const date = useFormInput('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const event = {
            title: title.value,
            description: description.value,
            price: +price.value,
            date: date.value
        } 
        createEvent(event)
    }

    return (
        <form className="event-edit" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input required type="text" {...title} />
            <label>Description:</label>
            <input required type="text" {...description} />
            <label>Price:</label>
            <input required type="number" {...price} />
            <label>Date:</label>
            <input required type="datetime-local" {...date} />
            <div className="modal-controls">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

function useFormInput(initState) {
    let [value, setValue] = useState(initState);
    const handleChange = (e) => setValue(e.target.value);

    return {
        value,
        onChange: handleChange
    }
}

export default EventEdit;