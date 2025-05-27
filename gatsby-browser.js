// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import React from 'react';
import { GlobalProvider } from './src/context/GlobalContext';
import { GlobalStyle } from './src/styles/GlobalStyle';
import Auth0ProviderWithHistory from './src/components/auth-provider/auth-provider';

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <GlobalStyle />
    <Auth0ProviderWithHistory>
      {element}
    </Auth0ProviderWithHistory>
  </GlobalProvider>
);
