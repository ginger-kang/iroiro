import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
import google from '../Images/google.png';
import naver from '../Images/naver.png';
import KakaoLogin from 'react-kakao-login';
import responseLogin from '../Services/ResponseLogin';
import NaverLogin from 'react-login-by-naver';
import { MdClose } from 'react-icons/md';
import KakaoLoginImg from '../Images/kakaologin.png';

const LoginContainer = styled('section')<LoginBoxProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: ${({ loginState }) => {
    if (loginState) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  justify-content: center;
  align-items: center;
`;

const NaverButton = styled.button`
  width: 86px;
  height: 77px;
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

const LoginBox = styled('div')`
  position: fixed;
  top: 48%;
  left: 50%;
  display: flex;
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
  right: 8px;
  top: 8px;
  cursor: pointer;
  background: none;

  & svg {
    color: white;
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

interface KakaoImg {
  img: any;
}

const KakaoButton = styled(KakaoLogin)<KakaoImg>`
  width: 75px;
  height: 75px;
  min-width: 70px;
  min-height: 70px;
  color: rgba(0, 0, 0, 0);
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 10px;
  font-size: 60px;
  text-align: center;
`;

interface IProps {
  loginButtonClick: boolean;
  setLoginButtonClick: any;
  setUserSocialId: any;
  setUserSocialName: any;
}
function LoginBoxComponent({
  loginButtonClick,
  setLoginButtonClick,
  setUserSocialId,
  setUserSocialName,
}: IProps) {
  return (
    <LoginContainer loginState={loginButtonClick}>
      <LoginBox>
        <GoogleLogin
          clientId="578715869929-mutudhudc1bh26dmvljgko5ofo7f690j.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                background: 'none',
                width: '82px',
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
          onSuccess={(res) =>
            responseLogin(res, 'google', setUserSocialId, setUserSocialName)
          }
          onFailure={(res) => console.log(res)}
          cookiePolicy={'single_host_origin'}
        />
        <KakaoButton
          jsKey="0a72b63b122363029a9f28be03dc7b33"
          buttonText="Kakao"
          onSuccess={(res) =>
            responseLogin(res, 'kakao', setUserSocialId, setUserSocialName)
          }
          onFailure={(res) => console.log(res)}
          getProfile={true}
          img={KakaoLoginImg}
        />
        <NaverLogin
          clientId="_L3yUfmDgCWHvk7vDar5"
          callbackUrl="http://iroiro.kro.kr/"
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
          onSuccess={(res) =>
            responseLogin(res, 'naver', setUserSocialId, setUserSocialName)
          }
          onFailure={() => console.log('naver login fail')}
        />
      </LoginBox>
      <LoginCancelButton onClick={() => setLoginButtonClick(!loginButtonClick)}>
        <MdClose size={33} />
      </LoginCancelButton>
    </LoginContainer>
  );
}

export default LoginBoxComponent;
