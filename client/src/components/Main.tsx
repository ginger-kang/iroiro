import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import google from '../Images/google.png';
import naver from '../Images/naver.png'
import KakaoLogin from 'react-kakao-login';
import { USER_EXIST, PHOTOS, CREATE_USER } from '../query';
import client from '../apollo';
import SittingDoodle from '../Images/doodle/GroovySittingDoodlee.svg';
import { AiFillRocket } from 'react-icons/ai';
import NaverLogin from 'react-login-by-naver';

const HomeContainer = styled('section')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${(props) => props.theme.firstBgColor};
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

interface LoginBoxProps {
  loginState: boolean;
}

const LoginBox = styled('div') <LoginBoxProps>`
  position: fixed;
  top: 50%;
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

interface scrollPercentage {
  scrollPos: number;
}

const HomeContentContainer = styled('div') <scrollPercentage>`
  color: black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  align-items: center;
  transition: all 1s ease;
  & img {
    margin-bottom: 0px;
    will-change: transform;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(${({ scrollPos }) => scrollPos}deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    transition: all 1.5s ease;
  }
`;

// const MainImageContainer = styled.img.attrs(props => ({
//     src: props.theme.sittingIcon,
//     alt: 'sittingIcon',
//     width: '60%',
// }))`

// `;

const MainTitleImage = styled.div`
  font-size: 7vw;
  & svg {
    animation: fill 0.5s ease forwards 2s;
    width: 50vw;
    height: 10vw;
    & path {
      stroke: ${(props) => props.theme.textColor};
    }
    & path:nth-child(1) {
      stroke-dasharray: 550px;
      stroke-dashoffset: 550px;
      animation: line-anim 2s ease forwards;
    }
    & path:nth-child(2) {
      stroke-dasharray: 300px;
      stroke-dashoffset: 300px;
      animation: line-anim 2s ease forwards 1s;
    }
    & path:nth-child(3) {
      stroke-dasharray: 180px;
      stroke-dashoffset: 180px;
      animation: line-anim 2s ease forwards 0.4s;
    }
    & path:nth-child(4) {
      stroke-dasharray: 344px;
      stroke-dashoffset: 344px;
      animation: line-anim 2s ease forwards 0.6s;
    }
    & path:nth-child(5) {
      stroke-dasharray: 477px;
      stroke-dashoffset: 477px;
      animation: line-anim 2s ease forwards 0.9s;
    }
    & path:nth-child(6) {
      stroke-dasharray: 171.759002px;
      stroke-dashoffset: 171.759002px;
      animation: line-anim 2s ease forwards 1.2s;
    }
    & path:nth-child(7) {
      stroke-dasharray: 402px;
      stroke-dashoffset: 402px;
      animation: line-anim 2s ease forwards 1.5s;
    }
    @keyframes line-anim {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes fill {
      from {
        fill: transparent;
      }
      to {
        fill: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const ContentContatiner = styled.p`
  font-size: 14px;
  padding: 15px;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

const LogoutButton = styled.div`
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

const LogoutBox = styled('div') <LogoutBoxProps>`
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

const ScrollController = styled.button`
  position: fixed;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
  transition: 1s ease;
  background: none;
  color: ${(props) => props.theme.textColor};
  z-index: 300;
  &:hover {
    transform: translateY(-10px);
  }
`;

const BottomLineContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: 0.1s ease;
  transform: translateX(-50%);
  & svg {
    & line {
      stroke: ${(props) => props.theme.borderColor};
    }
  }
`;
const NaverButton = styled.button`
width: 90px;
height: 80px;
min-width: 70px;
min-height: 70px;
color: black;
background-color: ${(props) => props.theme.borderColor};
border-radius: 10px;
font-size: 60px;
text-align: center;
    
`;

function Main() {

  const [loginButtonClick, setLoginButtonClick] = useState<boolean>(false);
  const [logoutButtonClick, setLogoutButtonClick] = useState<boolean>(false);
  const [isLoggedIn, setisLoggedIn] = useState<any>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  //total-user Info
  const [userSocialId, setUserSocialId] = useState(
    window.sessionStorage.getItem('userId'),
  );
  const [userSocialName, setUserSocialName] = useState(
    window.sessionStorage.getItem('userName'),
  );
  const [provider, setProvider] = useState('');

  useEffect(() => {
    setisLoggedIn(window.sessionStorage.getItem('userId'));
  }, []);

  //console.log(userSocialId, userSocialName, provider);

  //set google-user Info
  const responseLogin = (response: any, tempProvider: any) => {
    let userIdForQuery: any;
    let userNameForQuery: any;
    console.log('responseLogin');
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
      setLoginButtonClick(!loginButtonClick);
      
    }else if (tempProvider == 'naver') {
      
      userIdForQuery = String(response.id);
      userNameForQuery = response.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      setLoginButtonClick(!loginButtonClick);
      
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

  //logout
  const responseLogout = () => {
    window.sessionStorage.clear();
    window.location.reload();
  };

  const handleScrollControll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const getCurrentScroll = () => {

    
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
      100 >=
      28
    ) {
      setScrollPosition(13);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
      100 <
      28
    ) {
      setScrollPosition(0);
    }
  };

  window.addEventListener('scroll', getCurrentScroll);

  return (
    <HomeContainer>
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
          onSuccess={(res) => responseLogin(res, 'google')}
          onFailure={(res) => console.log('google login fail')}
          cookiePolicy={'single_host_origin'}
        />
        <KakaoButton
          jsKey="0a72b63b122363029a9f28be03dc7b33"
          buttonText="K"
          onSuccess={(res) => responseLogin(res, 'kakao')}
          onFailure={(res) => console.log('kakao login fail')}
          getProfile={true}
        />
        
        <NaverLogin
          clientId="_L3yUfmDgCWHvk7vDar5"
          callbackUrl="https://showmethestyle.herokuapp.com/"
          render={(props) => <NaverButton onClick={props.onClick}><img
            src={naver}
            alt="naver"
            style={{
              width: '100%',
              height: '100%',
            }}
          /></NaverButton>}
          onSuccess={(res) => responseLogin(res, 'naver')}
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
      <HomeContentContainer scrollPos={scrollPosition}>
        {/* <MainImageContainer /> */}
        <img src={SittingDoodle} alt="sittingDoodle" style={{ width: '60%' }} />
        <MainTitleImage>
          <svg
            width="626"
            height="113"
            viewBox="0 0 626 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M69.9297 7.57733L70.3477 4.71599H67.456H5.24799H2.74799V7.21599V106V108.5H5.24799H19.36H21.86V106V65.444H59.68H62.18V62.944V50.128V47.628H59.68H21.86V22.532H65.584H67.7454L68.0577 20.3933L69.9297 7.57733ZM128.22 6.30627L127.599 4.71599H125.892H110.34H108.633L108.011 6.30627L69.4193 105.09L68.0872 108.5H71.7479H85.4279H87.1482L87.7628 106.893L95.3562 87.044H139.158L146.89 106.907L147.51 108.5H149.22H164.484H168.145L166.812 105.09L128.22 6.30627ZM253.577 8.05379L254.764 4.71599H251.221H237.541H235.769L235.182 6.38841L209.178 80.5131L183.31 6.39221L182.725 4.71599H180.949H165.829H162.287L163.474 8.05379L198.61 106.838L199.201 108.5H200.965H216.085H217.85L218.441 106.838L253.577 8.05379ZM281.735 7.21599V4.71599H279.235H265.123H262.623V7.21599V106V108.5H265.123H326.611H329.535L329.081 105.612L327.065 92.7955L326.732 90.684H324.595H281.735V7.21599ZM340.666 87.966L340.676 87.9853L340.686 88.0044C344.349 95.0259 349.474 100.474 356.051 104.276C362.629 108.079 370.226 109.94 378.758 109.94C387.291 109.94 394.887 108.079 401.465 104.276C408.047 100.471 413.128 95.0169 416.696 87.9852C420.366 80.8469 422.154 72.5215 422.154 63.088V50.128C422.154 40.7013 420.369 32.4215 416.696 25.3741C413.131 18.2531 408.052 12.7477 401.465 8.93966C394.887 5.13661 387.291 3.27599 378.758 3.27599C370.226 3.27599 362.629 5.13661 356.051 8.93966C349.464 12.7475 344.339 18.251 340.679 25.3686L340.673 25.3811C337.099 32.4265 335.362 40.7031 335.362 50.128V63.088C335.362 72.5143 337.099 80.8324 340.666 87.966ZM396.715 28.2632L396.724 28.2731L396.732 28.283C400.809 33.0395 403.042 40.1894 403.042 50.128V63.088C403.042 73.1132 400.765 80.2974 396.612 85.0498C392.475 89.688 386.64 92.124 378.758 92.124C370.573 92.124 364.674 89.6319 360.65 84.944C356.661 80.1865 354.474 73.0312 354.474 63.088V50.128C354.474 40.2002 356.75 33.0582 360.912 28.3023C365.053 23.5689 370.886 21.092 378.758 21.092C386.952 21.092 392.792 23.5884 396.715 28.2632ZM440.088 87.966L440.098 87.9853L440.108 88.0044C443.771 95.0259 448.896 100.474 455.473 104.276C462.051 108.079 469.647 109.94 478.18 109.94C486.713 109.94 494.309 108.079 500.887 104.276C507.469 100.471 512.55 95.017 516.118 87.9852C519.788 80.8469 521.576 72.5215 521.576 63.088V50.128C521.576 40.7013 519.791 32.4216 516.118 25.3741C512.553 18.2531 507.474 12.7477 500.887 8.93966C494.309 5.13661 486.713 3.27599 478.18 3.27599C469.647 3.27599 462.051 5.13661 455.473 8.93966C448.886 12.7475 443.761 18.251 440.101 25.3686L440.094 25.3811C436.521 32.4265 434.784 40.7031 434.784 50.128V63.088C434.784 72.5143 436.521 80.8324 440.088 87.966ZM496.137 28.2632L496.145 28.2731L496.154 28.283C500.231 33.0395 502.464 40.1894 502.464 50.128V63.088C502.464 73.1132 500.187 80.2974 496.033 85.0498C491.897 89.688 486.061 92.124 478.18 92.124C469.995 92.124 464.096 89.6319 460.072 84.944C456.083 80.1865 453.896 73.0312 453.896 63.088V50.128C453.896 40.2002 456.172 33.0582 460.333 28.3023C464.475 23.5689 470.308 21.092 478.18 21.092C486.374 21.092 492.214 23.5884 496.137 28.2632ZM616.388 8.81458L619.797 4.71599H614.466H598.194H597.024L596.275 5.61394L557.782 51.7277V7.21599V4.71599H555.282H541.17H538.67V7.21599V106V108.5H541.17H555.282H557.782V106V77.3349L568.918 65.6243L597.13 107.399L597.874 108.5H599.202H615.618H620.337L617.686 104.596L581.303 51.0003L616.388 8.81458ZM102.317 69.228L117.388 30.0655L132.341 69.228H102.317Z"
              stroke="white"
              stroke-width="5"
            />
          </svg>
        </MainTitleImage>
        <ContentContatiner>
          {/* 
                        google user info test view
                    */}

          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '2.4vw',
            }}
          >
            자신의 스타일을 사람들에게 보여주세요
          </span>
        </ContentContatiner>
      </HomeContentContainer>
      <ScrollController onClick={handleScrollControll}>
        <AiFillRocket
          size={40}
          color={`${({ props }: { props: any }) => props.theme.textColor}`}
        />
      </ScrollController>
      <BottomLineContainer>
        <svg
          width="159"
          height="3"
          viewBox="0 0 159 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.993976"
            y1="2.00002"
            x2="158.994"
            y2="1.04821"
            stroke="#242CE3"
            strokeWidth="2"
          />
        </svg>
      </BottomLineContainer>
    </HomeContainer>
  );
}

export default Main;
