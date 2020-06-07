import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import google from '../../Images/google.png';
import KakaoLogin from 'react-kakao-login'
import SelectMenu from '../../components/Select';
import Winner from '../../components/Winner';
import {USER_EXIST,PHOTOS,CREATE_USER} from '../Game/query';
import client from '../../apollo';
import sittingDoodle from '../../Images/doodle/GroovySittingDoodle.png';
import { AiFillRocket } from 'react-icons/ai';


const HomeContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const LoginNavContainer = styled.nav`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginButton = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 8vw;
    height: 3vw;
    min-width: 60px;
    min-height: 25px;
    padding: 9px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid black;
    border-radius: 10px;
    background: black;
    font-size: 1.5vw;
    transition: all .1s ease;
    z-index: 300;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
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
    min-width: 400px;
    min-height: 140px;
    color: white;
    font-size: 20px;
    transition: all 1.5s ease;
    background: rgba(0,0,0,.78);
    border-radius: 11px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transform: translateX(-50%) translateY(-50%) scale(1.05);

    & button {
        transition: all .2s ease;

        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
`;

const KakaoButton = styled(KakaoLogin)`
    width: 25%;
    height: 25%;
    min-width: 100px;
    min-height: 100px;
    color: black;
    margin: 40px;
    background-color: #FFEB00;
    border-radius: 10px;
    font-size: 77px;
    text-align: center;
`;

const HomeContentContainer = styled.div`
    color: black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    align-items: center;
    transition: all 1s ease;

    & img {
        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-10deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
    }
`;

const MainTitleImage = styled.div`
    font-size: 7vw;
`;

const ContentContatiner = styled.p`
    font-size: 14px;
    padding: 15px;
    color: white;
    display: flex;
    justify-content: center;
`;

const LogoutButton = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 8vw;
    height: 3vw;
    min-width: 60px;
    min-height: 25px;
    padding: 9px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid black;
    border-radius: 10px;
    background: black;
    font-size: 1.5vw;
    transition: all .1s ease;
    z-index: 300;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
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
    min-width: 400px;
    min-height: 140px;
    color: white;
    font-size: 20px;
    transition: all 1.5s ease;
    background: rgba(0,0,0,.78);
    border-radius: 11px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transform: translateX(-50%) translateY(-50%) scale(1.05);

    & button {
        transition: all .2s ease;
        background: none;

        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
            background: rgba(0,0,0,.8);
            border-radius: 10px;
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

    &:hover {
        transform: translateY(-10px);
    }
`;

export default function Home() {
    const [loginButtonClick, setLoginButtonClick] = useState(false);
    const [logoutButtonClick, setLogoutButtonClick] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState<any>(null);

    //total-user Info
    const [userSocialId, setUserSocialId] = useState(window.sessionStorage.getItem('userId'));
    const [userSocialName, setUserSocialName] = useState(window.sessionStorage.getItem('userName'));
    const [provider, setProvider] = useState('');

    useEffect(() => {
        setisLoggedIn(window.sessionStorage.getItem('userId'));
        console.log(isLoggedIn)
        
    })

    console.log(userSocialId,userSocialName,provider);

    //set google-user Info
    const responseLogin = (response: any,tempProvider: any) => {
        

        let userIdForQuery: any;
        let userNameForQuery: any;
        
        if(tempProvider=='google'){
            userIdForQuery = response.googleId;
            userNameForQuery = response.profileObj.name;
            window.sessionStorage.setItem('userId',userIdForQuery);
            window.sessionStorage.setItem('userName',userNameForQuery);
            setUserSocialId(userIdForQuery);
            setUserSocialName(userNameForQuery);
            
            //setProvider('google');
            //window.sessionStorage.setItem('id',response.googleId);
            //localStorage.setItem('user',response.googleId);
        }else if(tempProvider=='kakao'){            
            userIdForQuery = String(response.profile.id);
            userNameForQuery = response.profile.kakao_account.profile.nickname 
            window.sessionStorage.setItem('userId',userIdForQuery);
            window.sessionStorage.setItem('userName',userNameForQuery);
            setUserSocialName(userNameForQuery);
            setUserSocialId(userIdForQuery);
            window.location.reload();
            //localStorage.setItem('user',response.profile.id);
            //window.sessionStorage.setItem('id',response.profile.id);
            //setProvider('kakao');
        }
        client.query({
            query: USER_EXIST, variables:{userId:userIdForQuery},
        }).then(res=>{
            if(res.data.User === null){
                client.mutate({
                    variables:{userId:userIdForQuery,userName:userNameForQuery},
                    mutation:CREATE_USER
                });
            };
            
           
        });
    }

    //logout
    const responseLogout = () => {
        window.sessionStorage.clear();
        window.location.reload();
        
    }

    const handleScrollControll = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    return (
        <>
            <HomeContainer>
                <LoginNavContainer>
                    <span style={{ color: 'black', fontSize: '18px' }}>Hello {userSocialName}!</span>  
                </LoginNavContainer>
                {isLoggedIn === null ? 
                <LoginButton onClick={() => setLoginButtonClick(!loginButtonClick)}>
                    로그인
                </LoginButton>
                : 
                <LogoutButton onClick={() => setLogoutButtonClick(!logoutButtonClick)}>
                    로그아웃
                </LogoutButton>
                }
                    <LoginBox loginState={loginButtonClick}>
                        <GoogleLogin
                            clientId="578715869929-mutudhudc1bh26dmvljgko5ofo7f690j.apps.googleusercontent.com"
                            render={renderProps => (
                                <button
                                    onClick={
                                        renderProps.onClick
                                    }
                                    disabled={renderProps.disabled}
                                    style={{
                                        background: 'none'
                                    }}
                                >
                                <img src={google}
                                    alt='google_logo'
                                    style={{
                                        width: '50%',
                                        height: '50%',
                                    }}
                                    onClick={() => setLoginButtonClick(!loginButtonClick)}
                                />
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={res=>responseLogin(res,'google')}
                            onFailure={res=>console.log('google login fail')}                            
                            cookiePolicy={'single_host_origin'}
                        />
                        <KakaoButton
                            jsKey='0a72b63b122363029a9f28be03dc7b33'
                            buttonText='K'
                            onSuccess={res=>responseLogin(res,'kakao')}
                            onFailure={res=>console.log('kakao login fail')}                        
                            getProfile={true}
                        />
                    </LoginBox>
                    <LogoutBox logoutState={logoutButtonClick}>
                        <span style={{
                            fontSize: '2vw',
                        }}>로그아웃 하시겠습니까?</span>
                                                  
                                <button
                                    onClick={responseLogout}                                    
                                    style={{
                                        width: '20%',
                                        height: '20%',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '1.7vw',
                                        marginTop: '20px', 
                                    }}
                                >확인
                                </button>
                            
                        
                    </LogoutBox>
                <HomeContentContainer>
                    <img src={sittingDoodle} alt='sittingDoodle' style={{ width: '40%'}} />
                    <MainTitleImage>
                        Lorem Ipsum
                    </MainTitleImage>
                    <ContentContatiner>
                    {/* 
                        google user info test view
                    */}
                    <span style={{ color: 'black', fontSize: '2.4vw' }}>자신의 스타일을 사람들에게 보여주세요</span>
                </ContentContatiner>
                </HomeContentContainer>
                <ScrollController onClick={handleScrollControll}>
                    <AiFillRocket size={40}/>
                </ScrollController>
            </HomeContainer>
            <SelectMenu />
            <Winner />
        </>
    );
}