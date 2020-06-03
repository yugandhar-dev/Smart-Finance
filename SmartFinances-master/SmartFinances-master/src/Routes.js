import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./components/UserDashboard";
import NewTransaction from "./components/NewTransaction";
import AdminDashboard from "./components/AdminDashboard";
import NewUser from "./components/NewUserCreation";
import UserDetails from "./components/UserDetails";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/user" exact component={UserLogin} />
        <Route path="/admin" exact component={AdminLogin} />
        <Route path="/user/dashboard" exact component={UserDashboard} />
        <Route path="/user/newTransaction" exact component={NewTransaction} />
        <Route path="/admin/fundsDashboard" exact component={AdminDashboard} />
        <Route path="/admin/newUser" exact component={NewUser} />
        <Route path="/admin/userDetails" exact component={UserDetails} />
        {/* <Route path="/signin/user" exact component={UserLogin} />
        <Route path="/signin/admin" exact component={AdminLogin} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
