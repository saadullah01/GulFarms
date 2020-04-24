import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Farm from './components/Farm';
import Landing from './components/Landing';
import Tab from './components/Tab';

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Tab /> */}
          <AppNavbar />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />
          <Route exact path="/reset-password" component={ ResetPassword } />
          <Route exact path="/farms" component={ Farm } />
          <Route exact path="/home" component={ Landing } />
        </div>
      </Router>
    );
  }
}

export default App;
