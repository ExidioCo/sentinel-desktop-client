import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthenticatedRoutes, UnauthenticatedRoutes, PostLoginAuthRoutes } from "./Routes";

export const AuthGate = () => {

  const isAuthenticated = useSelector(state  => state.loginReducer.isAuthenticated);
  const isPostLoginAuth = useSelector(state  => state.loginReducer.isPostLoginAuth);
  
  if(isPostLoginAuth) {
    if (isAuthenticated) {
      return <AuthenticatedRoutes />;
    }
    return <PostLoginAuthRoutes />
  }
  
  return <UnauthenticatedRoutes />;
};
