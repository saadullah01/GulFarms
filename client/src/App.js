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
import AddUser from './components/auth/AddUser';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import FarmsList from './components/FarmsList';
import Farm from "./components/Farm";
import Landing from './components/Landing';
import CreateFarm from './components/CreateFarm';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/PrivateRoute"
import store from "./store"
//will keep user logged in even if refreshes too from a react tutorial
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
const  App =()=>{
    return (
      <Router>
        <div className="App">
          <Route path="/" component={ AppNavbar } />
          <Route path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route path="/reset-password" component={ ResetPassword } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />
          <PrivateRoute exact path="/add-user" component={ AddUser } />
          <PrivateRoute exact path="/(|home|home/farms|home/alerts|home/finances|home/farms/create-farm)" component={ Landing } />
          <Switch>
            <PrivateRoute exact path="/(home/farms|home/farms/create-farm)" component={ FarmsList } />
            <PrivateRoute exact path="/home/farms/:id" component={Farm} />
            <PrivateRoute exact path="/home/alerts" />
            <PrivateRoute exact path="/home/finances" />
          </Switch>
          <PrivateRoute exact path="/home/farms/create-farm" component={ CreateFarm } />
        </div>  
      </Router>   
    );
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