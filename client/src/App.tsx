import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import Router from './Router';
import { lightTheme, darkTheme } from './theme';
import { FiMoon } from 'react-icons/fi';
import client from './apollo';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

const AppContainer = styled.div``;

interface ToggleProps {
  isLight: boolean;
}

const MoonButton = styled('button')<ToggleProps>`
  position: absolute;
  left: 6px;
  top: 6px;
  transition: all 0.5s ease;
  background: none;
  color: white;
  z-index: 10;

  & svg {
    fill: ${({ isLight }) => {
      if (isLight) {
        return 'black';
      } else {
        return '#ffff35';
      }
    }};

    color: ${({ isLight }) => {
      if (isLight) {
        return 'black';
      } else {
        return '#ffff35';
      }
    }};
  }
`;

function App() {
  const [theme, setTheme] = useState('light');

  const isLight = theme === 'light';

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setMode(theme);
    }
  }, []);

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <AppContainer>
      <MoonButton isLight={isLight} onClick={toggleTheme}>
        <FiMoon size={30} />
      </MoonButton>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Router />
          </ThemeProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </AppContainer>
  );
}

export default App;
