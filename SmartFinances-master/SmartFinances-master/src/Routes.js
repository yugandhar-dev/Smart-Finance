import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import PayMerchant from './components/payToMerchant/payToMerchant';
import AdminDashboard from './components/AdminDashboard';
import NewUser from './components/NewUserCreation';
import UserDetails from './components/UserDetails';
import ContactUs from './components/contactUs/ContactUs';
import { AuthContext } from './context/auth';
import { PrivateRoute } from './components/PrivateRoute';
import Sell from './components/investments/sell/sell';
import History from './components/Transactions/history';
import SignUpForm from './components/signUp/signUpForm';
import Spending from './components/Spendings/spendinghistory';
import Questions from './components/ChatBotdashboard/Instructions/questions';
import Questionnaire from './components/Questionnaire/questionnaire';

const Routes = () => {
  const existingToken = localStorage.getItem('token');
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = data => {
    localStorage.setItem('token', data);
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/user" exact component={UserLogin} />
          <Route path="/admin" exact component={AdminLogin} />
          <Route path="/signup" exact component={SignUpForm} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={(UserDashboard)}
          />
          <PrivateRoute
            path="/user/payToMerchant"
            exact
            component={PayMerchant}
          />
          <PrivateRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <PrivateRoute path="/admin/newUser" exact component={NewUser} />
          <PrivateRoute
            path="/admin/userDetails"
            exact
            component={UserDetails}
          />
          <PrivateRoute path="/user/investmentsell" component={Sell} />
          <PrivateRoute path="/user/transactionhistory" component={History} />
          <PrivateRoute path="/user/spendinghistory" component={Spending} />
          <PrivateRoute path='/user/questionnaire' component={Questionnaire} />
          <PrivateRoute path="/user/contactus" component={ContactUs} />
          
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Routes;

