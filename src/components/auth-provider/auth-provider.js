import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from "gatsby";
import AuthGuard from "./auth-guard";

const AUTH_DOMAIN = process.env.GATSBY_OKTA_DOMAIN;
const AUTH_CLIENT_ID = process.env.GATSBY_OKTA_CLIENT_ID;
const AUTH_AUDIENCE = process.env.GATSBY_OKTA_ISSUER;

const Auth0ProviderWithHistory = ({ children }) => {

    if (typeof window === "undefined") return null; // Prevent SSR crash
    const onRedirectCallback = (appState) => {
        const returnTo = appState?.returnTo || window.location.pathname;
        navigate(returnTo);
    };

    const authConfig = {
        domain: AUTH_DOMAIN,
        clientId: AUTH_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin + window.location.pathname,
            audience: AUTH_AUDIENCE,
            scope: "openid profile email"
        }
    };

    console.log("redirect uri:", window.location.origin);

    return (
        <Auth0Provider
            domain={authConfig.domain}
            clientId={authConfig.clientId}
            authorizationParams={authConfig.authorizationParams}
            onRedirectCallback={onRedirectCallback}
        >
            <AuthGuard>{children}</AuthGuard>
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
