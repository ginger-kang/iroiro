import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import google from '../Images/google.png';
import naver from '../Images/naver.png';
import KakaoLogin from 'react-kakao-login';
import client from '../apollo';
import { USER_EXIST, PHOTOS, CREATE_USER } from '../query';
//import responseLogin from '../Services/ResponseLogin'

import NaverLogin from 'react-login-by-naver';


interface LoginBoxProps {
    loginState: boolean;
}

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

const LogoutBox = styled('div')<LogoutBoxProps>`
  position: fixed;
  top: 48%;
  left: 50%;
  display: ${({ logoutState }) => {
    if (logoutState) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
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
  z-index: 10000;
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

const NaverButton = styled.button`
  width: 90px;
  height: 80px;
  min-width: 70px;
  min-height: 70px;
  color: black;
  background-color: transparent;
  border-radius: 10px;
  font-size: 60px;
  text-align: center;
`;

const LoginBox = styled('div') <LoginBoxProps>`
    position: fixed;
    top: 48%;
    left: 50%;
    display: ${({ loginState }) => {
        if (loginState) {
            return 'flex';
        } else {
            return 'none';
        }
    }};
    width: 30vw;
    min-width: 300px;
    min-height: 140px;
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    transition: all 1.5s ease;
    background: ${(props) => props.theme.modalBgColor};
    border-radius: 6px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10000;
    transform: translateX(-50%) translateY(-50%) scale(1.05);
    & button {
      transition: all 0.2s ease;
      &:hover {
        -ms-transform: scale(1.05);
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
      }
    }
  `;

const LoginCancelButton = styled.button`
    position: absolute;
    left: 5px;
    top: 5px;
    color: white;
    cursor: pointer;
    background: white;
    border-radius: 100%;
    width: 15px;
    height: 15px;
  
    &:hover {
      background: red;
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

const KakaoButton = styled(KakaoLogin)`
    width: 80px;
    height: 80px;
    min-width: 70px;
    min-height: 70px;
    color: black;
    background-color: #ffeb00;
    border-radius: 10px;
    font-size: 60px;
    text-align: center;
  `;

  const responseLogout = () => {
    window.sessionStorage.clear();
    window.location.reload();
  };

  const responseLogin = (response: any, tempProvider: any,setUserSocialId:any,setUserSocialName:any) => {
    
    let userIdForQuery: any;
    let userNameForQuery: any;
    


    if (tempProvider == 'google') {
      userIdForQuery = response.googleId;
      userNameForQuery = response.profileObj.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialId(userIdForQuery);
      setUserSocialName(userNameForQuery);
    } else if (tempProvider == 'kakao') {
      userIdForQuery = String(response.profile.id);
      userNameForQuery = response.profile.kakao_account.profile.nickname;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    } else if (tempProvider == 'naver') {
      userIdForQuery = String(response.id);
      userNameForQuery = response.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    }

    client
      .query({
        query: USER_EXIST,
        variables: { userId: userIdForQuery },
      })
      .then((res) => {
        if (res.data.User === null) {
          client.mutate({
            variables: {
              userId: userIdForQuery,
              userName: userNameForQuery,
              userNickName: null,
              userInstagram: null,
            },
            mutation: CREATE_USER,
          });
        }
      });
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

            <LoginBox loginState={loginButtonClick}>
                <GoogleLogin
                    clientId="578715869929-mutudhudc1bh26dmvljgko5ofo7f690j.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            style={{
                                background: 'none',
                                width: '85px',
                                minWidth: '75px',
                            }}
                        >
                            <img
                                src={google}
                                alt="google_logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                onClick={() => setLoginButtonClick(!loginButtonClick)}
                            />
                        </button>
                    )}
                    buttonText="Login"
                    onSuccess={(res) => responseLogin(res, 'google',setUserSocialId,setUserSocialName)}
                    onFailure={(res) => console.log('google login fail')}
                    cookiePolicy={'single_host_origin'}
                />
                <KakaoButton
                    jsKey="0a72b63b122363029a9f28be03dc7b33"
                    buttonText="K"
                    onSuccess={(res) => responseLogin(res, 'kakao',setUserSocialId,setUserSocialName)}
                    onFailure={(res) => console.log('kakao login fail')}
                    getProfile={true}
                />

                <NaverLogin
                    clientId="_L3yUfmDgCWHvk7vDar5"
                    callbackUrl="https://showmethestyle.herokuapp.com/"
                    render={(props) => (
                        <NaverButton onClick={props.onClick}>
                            <img
                                src={naver}
                                alt="naver"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </NaverButton>
                    )}
                    onSuccess={(res) => responseLogin(res, 'naver',setUserSocialId,setUserSocialName)}
                    onFailure={() => console.log('naver login fail')}
                />
                <LoginCancelButton
                    onClick={() => setLoginButtonClick(!loginButtonClick)}
                />
            </LoginBox>



            <LogoutBox logoutState={logoutButtonClick}>
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
        </>
    );

}

export default Login;