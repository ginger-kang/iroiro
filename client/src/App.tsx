import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import Router from './Router';
//import { ThemeProvider } from './theme-components';
import { Theme } from './theme';

const AppContainer = styled.div`
  
`;

function App() {
  return(
    <AppContainer>
      <GlobalStyle />
        <Router />
    </AppContainer>
  );
};

export default App;
