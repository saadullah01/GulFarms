import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import AppNavbar from './components/sub_components/AppNavbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import FarmsList from './components/FarmsList';
import Landing from './components/Landing';
import CreateFarm from './components/CreateFarm';
import Farm from './components/Farm';

class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Route path="/reset-password" component={ ResetPassword } />
          <Route path="/forgot-password" component={ ForgotPassword } />
          <Route path="/" component={ AppNavbar } />
          <Route path="/home" component={ Landing } />
          <Switch>
            <Route path="/home/farms" component={ FarmsList } />
            <Route path="/alerts" />
            <Route path="/finances" />
          </Switch>
          <Route path="/home/farms/:farmID" component={ Farm } />
        </div>  
      </Router>   
    );
  }
}

export default App;