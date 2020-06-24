import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import Router from './Router';
import { lightTheme, darkTheme } from './theme';
import client from './apollo';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

const AppContainer = styled.div``;

interface ToggleProps {
  isLight: boolean;
}

const ToggleButtonContainer = styled('div')<ToggleProps>`
  background: ${({ isLight }) => {
    if (isLight) {
      return 'linear-gradient(#331679,#716a6a)';
    } else {
      return 'linear-gradient(#3c93ff,#b8bbff)';
    }
  }};
  top: 3px;
  left: 3px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 600;
  width: 64px;
  height: 36px;
  transition: all 0.5s ease;
`;

const ToggleButton = styled('button')<ToggleProps>`
  position: absolute;
  left: 4px;
  top: 4px;
  background: white;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  transition: all 0.5s ease;

  transform: ${({ isLight }) => {
    if (isLight) {
      return 'translateX(29px)';
    } else {
      return 'translateX(0)';
    }
  }};
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
      <ToggleButtonContainer isLight={isLight}>
        <ToggleButton isLight={isLight} onClick={toggleTheme} />
      </ToggleButtonContainer>
      {/* <div style={{width: '300px', height: '200px', backgroundColor: 'tomato'}}>테스트</div> */}
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
