import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { LandingPage } from "pages/LandingPage";
import { CreateAccount } from "pages/CreateAccount";
import { Login } from "pages/Login";
import { AccountCreated } from "pages/Auth/AccountCreated";
import { ConfigureSetting } from "pages/ConfigureSetting";

import Dashboard from "pages/Dashboard";
// import { Loader } from "atoms";

export const UnauthenticatedRoutes = () => {
  return (
    <Suspense>
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/landing" />
      </Switch>
    </Suspense>
  );
};

export const AuthenticatedRoutes = () => {

  const redirectURL = useSelector(state  => state.loginReducer.redirectURL);
  
  return (
    <Suspense>
      <Switch>
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/configure-setting" component={ConfigureSetting} />
        <Route exact path="/account-created" component={AccountCreated} />
        <Route exact path="/dashboard/wallet" component={Dashboard} />
        <Route exact path="/dashboard/dVPN" component={Dashboard} />
        <Redirect to={redirectURL} />
      </Switch>
    </Suspense>
  );
};
