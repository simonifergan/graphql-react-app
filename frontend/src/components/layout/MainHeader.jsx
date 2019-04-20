import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

const MainHeader = (props) => {
    const authContext = useContext(AuthContext);

    const logout = () => {
        authContext.logout();
    }

    useEffect(() => {
        // Re-render when authContext changes (componentDidUpdate)
    }, [authContext.user])

    const navLinks = (authContext && authContext.user) ? (
        <ul>
            <li><NavLink to="/events">Events</NavLink></li>
            <li><NavLink to="/bookings">Bookings</NavLink></li>
            <li onClick={logout}>Logout</li>
        </ul>
    ) : (
            <ul>
                <li><NavLink to="/auth">Log in</NavLink></li>
            </ul>
        );


    return (
        <header className="main-header">
            <div className="logo">
                <h1>Graph Events</h1>
            </div>
            <nav className="main-nav">
                {navLinks}
            </nav>
        </header>
    );
}

export default MainHeader;