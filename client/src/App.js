import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";
import { 
  setCurrentUser, 
  logoutUser } 
from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import AddAlert from './components/AddAlerts';
import AddUser from './components/auth/AddUser';
import Alerts from './components/Alerts';
import AnimalInstance from './components/AnimalInstance';
import AnimalPreset from './components/AnimalPreset';
import AppNavbar from './components/sub_components/AppNavbar';
import CreateAnimalIndividual from './components/CreateAnimalIndividual'
import CreateBarn from "./components/CreateBarn"
import CreateFarm from './components/CreateFarm';
import CreateNewAnimal from "./components/CreateNewAnimal"
import Farm from "./components/Farm";
import FarmsList from './components/FarmsList';
import Finance from './components/Finance';
import ForgotPassword from './components/auth/ForgotPassword';
import jwt_decode from "jwt-decode";
import Landing from './components/Landing';
import Login from './components/auth/Login';
import PrivateRoute from "./components/PrivateRoute"
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import setAuthToken from "./utils/setAuthToken";
import store from "./store"
import ViewFarm from './components/ViewFarm'
import Delete from './components/Delete';
import RemoveBarn from "./components/RemoveBarn"
import RemoveFarm from "./components/RemoveFarm"
import RemovePreset from "./components/RemoveAnimal"
import ViewAnimalIndividual from './components/ViewAnimalIndividual';

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
const App =()=>{
    return (
      <Router>
        <div className="App">
          <Route path="/" component={ AppNavbar } />
          <Route path="/home/alerts" component={ Alerts } />
          <Route exact path="/home/finances" component={ Finance } />
          <Route exact path="/home/Deleted" component={ Delete } />
          <Route path="/cf" component={ ViewAnimalIndividual } />
          <Route path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route path="/reset-password" component={ ResetPassword } />
          <Route exact path="/forgot-password" component={ ForgotPassword } />
          <PrivateRoute exact path="/add-user" component={ AddUser } />
          <PrivateRoute exact path="/(|home|home/farms|home/farms/create-farm)" component={ Landing } />
          <Switch>
            <PrivateRoute exact path="/(home/farms|home/farms/create-farm)" component={ FarmsList } />
            <PrivateRoute exact path="/home/farms/:id" component={Farm} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/home/farms/create-farm" component={ CreateFarm } />
          <PrivateRoute exact path="/home/farms/:fid/create-preset" component={ CreateNewAnimal } />
          <PrivateRoute exact path="/home/farms/:fid/remove-farm" component={ RemoveFarm } />
          <PrivateRoute exact path="/home/farms/:fid/:pid" component={ AnimalPreset } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/create-barn" component={ CreateBarn } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/remove-preset" component={ RemovePreset } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/:bid" component={ AnimalInstance } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/:bid/remove-barn" component={ RemoveBarn } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/:bid/create-instance" component={ CreateAnimalIndividual } />
          <PrivateRoute exact path="/home/farms/:fid/:pid/:bid/:iid" component={ ViewAnimalIndividual } />
          </Switch>
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