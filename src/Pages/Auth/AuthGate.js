import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./Routes";

export const AuthGate = () => {

  const isAuthenticated = useSelector(state  => state.loginReducer.isAuthenticated);
  console.log('isAuthenticated----', isAuthenticated);
  if (isAuthenticated) {
    return <AuthenticatedRoutes />;
  }

  return <UnauthenticatedRoutes />;
};
