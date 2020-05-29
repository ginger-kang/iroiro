import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import Router from './Router';
//import { ThemeProvider } from './theme-components';
import { Theme } from './theme';
import client from "./apollo";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <GlobalStyle />
          <Router />
        </ApolloHooksProvider>
      </ApolloProvider>
    </AppContainer>
  );
};

export default App;
