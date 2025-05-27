import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthGuard = ({ children }) => {
  // Always call the hook to avoid hook rule violations
  const { isLoading } = useAuth0();

  // Only use Auth0 on the client side
  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  if (isLoading) {
    return null; // or show a spinner/loader
  }

  return <>{children}</>;
};

export default AuthGuard;
