import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import AppNavbar from './components/sub_components/AppNavbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Farm from './components/Farm';
import Landing from './components/Landing';

function NavDisplay (props) {
  const link = props.link.substring(props.link.lastIndexOf('/') + 1);
  if (link === 'register' || link === 'login' || link === 'forgot-password' || link === 'reset-password') {
    return null;
  } else {
    return <AppNavbar />;
  }
}

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <NavDisplay link={ window.location.href } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />
          <Route exact path="/reset-password" component={ ResetPassword } />
          <Route exact path="/(home|home/farms|home/alerts|home/finances)" component={ Landing } />
          <Route exact path="/home/farms" component={ Farm } />
        </div>
      </Router>
    );
  }
}

export default App;
