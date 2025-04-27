// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import React from 'react';
import { GlobalProvider } from './src/context/GlobalContext';
import { GlobalStyle } from './src/styles/GlobalStyle';

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <GlobalStyle />
    {element}
  </GlobalProvider>
);
