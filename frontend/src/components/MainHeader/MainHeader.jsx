import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import './MainHeader.css';

const MainHeader = (props) => {
    const authContext = useContext(AuthContext);


    useEffect(() => {
        // Re-render when authContext changes (componentDidUpdate)
    }, [authContext.user])

    const navLinks = (authContext.user) ? (
        <React.Fragment>
            <li><NavLink to="/events">Events</NavLink></li>
            <li><NavLink to="/bookings">Bookings</NavLink></li>
            <li onClick={authContext.logout}>Logout</li>
        </React.Fragment>
    ) : (
            <React.Fragment>
                <li><NavLink to="/events">Events</NavLink></li>
                <li><NavLink to="/auth">Log in</NavLink></li>
            </React.Fragment>
        );


    return (
        <header className="main-header">
            <div className="logo">
                <h1><NavLink to="/">Graph Events</NavLink></h1>
            </div>
            <nav className="main-nav">
                <ul>
                    {navLinks}
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;