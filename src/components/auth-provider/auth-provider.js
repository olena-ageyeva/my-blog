import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from "gatsby";

const AUTH_DOMAIN = process.env.GATSBY_OKTA_DOMAIN;
const AUTH_CLIENT_ID = process.env.GATSBY_OKTA_CLIENT_ID;
const AUTH_AUDIENCE = process.env.GATSBY_OKTA_ISSUER;

const Auth0ProviderWithHistory = ({ children }) => {
    console.log('Auth0ProviderWithHistory called', {
        window: typeof window,
        AUTH_DOMAIN,
        AUTH_CLIENT_ID,
        children: !!children
    });

    // Always return children during SSR
    if (typeof window === "undefined") {
        console.log('SSR mode, returning children directly');
        return children;
    }

    // Check if Auth0 environment variables are available
    if (!AUTH_DOMAIN || !AUTH_CLIENT_ID) {
        console.warn('Auth0 environment variables not found, running without authentication');
        return children;
    }

    const onRedirectCallback = (appState) => {
        const returnTo = appState?.returnTo || window.location.pathname;
        navigate(returnTo);
    };

    const authConfig = {
        domain: AUTH_DOMAIN,
        clientId: AUTH_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin + '/login/callback',
            audience: AUTH_AUDIENCE,
            scope: "openid profile email"
        }
    };

    console.log('Creating Auth0Provider with config:', authConfig);

    return (
        <Auth0Provider
            domain={authConfig.domain}
            clientId={authConfig.clientId}
            authorizationParams={authConfig.authorizationParams}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
