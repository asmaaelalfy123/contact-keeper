import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

import ContactState from './context/contacts/contactState';

import AuthState from './context/auth/AuthState';

import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

//private route
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Fragment>
            <Router>
              <Navbar />

              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={RegisterForm} />
                  <Route exact path='/login' component={LoginForm} />
                </Switch>
              </div>
            </Router>
          </Fragment>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
