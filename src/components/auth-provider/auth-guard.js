import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthGuard = ({ children }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return null; // or show a spinner/loader
  }

  return <>{children}</>;
};

export default AuthGuard;
