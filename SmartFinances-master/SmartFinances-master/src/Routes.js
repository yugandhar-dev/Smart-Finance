import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./components/UserDashboard";
import PayMerchant from './components/payToMerchant/payToMerchant'
import AdminDashboard from "./components/AdminDashboard";
import NewUser from "./components/NewUserCreation";
import UserDetails from "./components/UserDetails";
import {AuthContext} from './context/auth'
import {PrivateRoute} from './components/PrivateRoute'
import Sell from './components/investments/sell/sell'
import History from './components/Transactions/history'


const Routes = () => {
  const existingToken = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(existingToken);
  
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/user" exact component={UserLogin} />
        <Route path="/admin" exact component={AdminLogin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path = '/user/payToMerchant' exact component={PayMerchant} />
        <PrivateRoute path="/admin/fundsDashboard" exact component={AdminDashboard} />
        <PrivateRoute path="/admin/newUser" exact component={NewUser} />
        <PrivateRoute path="/admin/userDetails" exact component={UserDetails} />
        <PrivateRoute path="/user/investmentsell" component={Sell}/>
        <PrivateRoute path="/user/transactionhistory" component={History}/>
      </Switch>
    </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Routes;
