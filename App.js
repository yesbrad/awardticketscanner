import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'styled-components';
import Navigation from './src/naviagtion';
import Store from './src/store';
/* eslint react/prop-types: 0 */

//Theme
import {MainTheme} from './src/themes/Main';

import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const App = () => {
  return (
    <StoreProvider store={Store}>
      <ThemeProvider theme={MainTheme}>
        <Navigation>
        </Navigation>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
