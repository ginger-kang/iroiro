import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import LoginBoxComponent from './LoginBox';

const LogoutContainer = styled('section')<LogoutBoxProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: ${({ logoutState }) => {
    if (logoutState) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 9vw;
  height: 3vw;
  min-width: 60px;
  min-height: 25px;
  padding: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 1.3vw;
  text-align: center;
  transition: all 0.1s ease;
  z-index: 300;
  cursor: pointer;
  background: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

interface LogoutBoxProps {
  logoutState: boolean;
}

const LogoutBox = styled('div')`
  position: fixed;
  top: 48%;
  left: 50%;
  display: flex;
  width: 30vw;
  min-width: 300px;
  min-height: 140px;
  color: white;
  font-size: 20px;
  transition: all 1.5s ease;
  background: ${(props) => props.theme.modalBgColor};
  border-radius: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%) translateY(-50%) scale(1.05);
`;

const LogoutButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30%;
  margin-top: 20px;
  & button {
    transition: all 0.2s ease;
    background: none;
    color: white;
    width: 80px;
    height: 33px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 6px;
    background: ${(props) => props.theme.pointColor};
    &:hover {
      background: #072ea7;
    }
  }
`;

const LoginButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 9vw;
  height: 3vw;
  min-width: 60px;
  min-height: 25px;
  padding: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 1.3vw;
  transition: all 0.1s ease;
  z-index: 300;
  cursor: pointer;
  background: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const responseLogout = () => {
  window.sessionStorage.clear();
  window.location.reload();
};

function Login() {
  const [userSocialId, setUserSocialId] = useState(
    window.sessionStorage.getItem('userId'),
  );
  const [userSocialName, setUserSocialName] = useState(
    window.sessionStorage.getItem('userName'),
  );

  const [loginButtonClick, setLoginButtonClick] = useState<boolean>(false);
  const [isLoggedIn, setisLoggedIn] = useState<any>(null);
  const [logoutButtonClick, setLogoutButtonClick] = useState<boolean>(false);
  useEffect(() => {
    setisLoggedIn(window.sessionStorage.getItem('userId'));
  }, []);
  return (
    <>
      {isLoggedIn === null ? (
        <LoginButton onClick={() => setLoginButtonClick(!loginButtonClick)}>
          로그인
        </LoginButton>
      ) : (
        <LogoutButton onClick={() => setLogoutButtonClick(!logoutButtonClick)}>
          로그아웃
        </LogoutButton>
      )}

      <LoginBoxComponent
        loginButtonClick={loginButtonClick}
        setLoginButtonClick={setLoginButtonClick}
        setUserSocialId={setUserSocialId}
        setUserSocialName={setUserSocialName}
      />
      <LogoutContainer logoutState={logoutButtonClick}>
        <LogoutBox>
          <span
            style={{
              fontSize: '23px',
            }}
          >
            로그아웃 하시겠습니까?
          </span>
          <LogoutButtonContainer>
            <button onClick={responseLogout}>예</button>
            <button onClick={() => setLogoutButtonClick(!logoutButtonClick)}>
              아니요
            </button>
          </LogoutButtonContainer>
        </LogoutBox>
      </LogoutContainer>
    </>
  );
}

export default Login;
