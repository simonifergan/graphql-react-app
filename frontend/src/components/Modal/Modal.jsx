import React, { useEffect } from 'react';
import './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

export default (props) => {

    useEffect(() => {
        return () => {
        }
    }, [])

    const closeModal = (e) => {
        props.setActiveState(false);
    }

    return (props.isActive) ? (
        <React.Fragment>
            <Backdrop onClick={closeModal} />
            <aside className="modal">
                <button className="btn btn-close-modal" onClick={closeModal}>&times;</button>
                <header className="modal-header">
                    <h2>{props.title}</h2>
                </header>
                <section className="modal-content">
                    {React.cloneElement(props.children, {onCancel: closeModal})}
                </section>
            </aside>
        </React.Fragment>
    ) : null
}