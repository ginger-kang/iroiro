import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global-styles';
import Router from './Router';
import { lightTheme, darkTheme } from './theme';
import client from './apollo';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import DarkMode from './Images/darkMode.svg';
import LightMode from './Images/lightMode.svg';

const AppContainer = styled.div``;

interface ToggleProps {
  isLight: boolean;
  theme: any;
}

const DarkModeToggleButton = styled('div')<ToggleProps>`
  background: ${({ isLight }) => {
    if (isLight) {
      return 'linear-gradient(#39598A, #79D7ED)';
    } else {
      return 'linear-gradient(#091236, #1E215D)';
    }
  }};
  border: 2px solid
    ${({ isLight }) => {
      if (isLight) {
        return '#FFF';
      } else {
        return '#6B8096';
      }
    }};
  top: 5px;
  left: 5px;
  border-radius: 30px;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: absolute;
  z-index: 500;
  width: 8vw;
  min-width: 66px;
  min-height: 40px;

  img {
    height: 2.5vw;
    width: 3vw;
    min-width: 27px;
    min-height: 22px;
    transition: all 0.5s linear;
    cursor: pointer;

    // sun
    &:nth-child(1) {
      transform: ${({ isLight }) => {
        if (isLight) {
          return 'translateY(-45px)';
        } else {
          return 'translateY(0)';
        }
      }};
    }
    // moon
    &:nth-child(2) {
      transform: ${({ isLight }) => {
        if (isLight) {
          return 'translateY(0)';
        } else {
          return 'translateY(-45px)';
        }
      }};
    }
  }
`;

function App() {
  const [theme, setTheme] = useState('light');

  const isLight = theme === 'light';

  const toggleTheme = () => {
    console.log(theme);
    console.log(isLight);
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <AppContainer>
      <DarkModeToggleButton isLight={isLight}>
        <img src={LightMode} alt="sun" onClick={toggleTheme} />
        <img src={DarkMode} alt="moon" onClick={toggleTheme} />
      </DarkModeToggleButton>
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
