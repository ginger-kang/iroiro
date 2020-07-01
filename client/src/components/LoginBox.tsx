import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import google from '../Images/google.png';
import naver from '../Images/naver.png';
import KakaoLogin from 'react-kakao-login';

import responseLogin from '../Services/ResponseLogin'

import NaverLogin from 'react-login-by-naver';



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


interface LoginBoxProps {
    loginState: boolean;
}

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

interface IProps{
    loginButtonClick:boolean
    setLoginButtonClick:any
    setUserSocialId:any
    setUserSocialName:any
}
function LoginBoxComponent({loginButtonClick,setLoginButtonClick,setUserSocialId,setUserSocialName}:IProps){
    return(
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
                    callbackUrl="http://localhost:5000/select"
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
    )
}

export default LoginBoxComponent;