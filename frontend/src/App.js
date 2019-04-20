import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

// Pages
import AuthPage from './pages/AuthPage'
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';

// CMPS
import MainHeader from './components/layout/MainHeader'

// Context
import Context from './context/Context';

const App = props => {
  return (
    <Context>
      <BrowserRouter>
        <React.Fragment>
          <MainHeader />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingsPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </Context>
  );
}

export default App;
