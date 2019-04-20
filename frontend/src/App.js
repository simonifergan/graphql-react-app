import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

// Pages
import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';

// CMPS
import MainHeader from './components/layout/MainHeader'


import AuthContext from './context/AuthContext';

const App = props => {

  const authContext = useContext(AuthContext)

  useEffect(() => {
    // Adjust route render when user is logged in
    return () => {

    };
  }, [authContext.user])
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainHeader />
        <main className="main-content">
          <Switch>
            {authContext.user && <Redirect from="/" to="/events" exact />}
            {authContext.user && <Redirect from="/auth" to="/events" exact />}
            {!authContext.user && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={EventsPage} />
            {authContext.user && <Route path="/bookings" component={BookingsPage} />}
            {!authContext.user && <Redirect to="/auth" exact />}
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
