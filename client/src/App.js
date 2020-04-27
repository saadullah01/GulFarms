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
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";



class App extends Component{
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={ AppNavbar } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/reset-password" component={ ResetPassword } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />
          <Route path="/home" component={ Landing } />
          <Switch>
            <Route exact path="/home/farms" component={ FarmsList } />
            <Route exact path="/alerts" />
            <Route exact path="/finances" />
          </Switch>
        </div>  
      </Router>   
    );
  }
}

export default App;




// const NavDisplay= (props) => {
//   const link = props.link.substring(props.link.lastIndexOf('/') + 1);
//   return(( !(link === 'register' || link === 'login' || link === 'forgot-password' || link === 'reset-password') &&  <AppNavbar />))
// }
// SAAD !!!! I thought this looked more pretty you can decide which ever you like ALSO IN BOTH CASES WARNINGS ATI DO
// function NavDisplay (props) {
//   const link = props.link.substring(props.link.lastIndexOf('/') + 1);
//   if (link === 'register' || link === 'login' || link === 'forgot-password' || link === 'reset-password') {
//     return null;
//   } else {
//     return <AppNavbar />;
//   }
// }
// just adding to see if git works