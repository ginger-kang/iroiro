import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import google from '../../Images/google.png';
import KakaoLogin from 'react-kakao-login'
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import {googleApi,kakaoApi} from '../../../../login-config/loginConfig'

const HomeContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const LoginContainer = styled.button`
    position: absolute;
    right: 20px;
    height: 44px;
    padding: 9px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.3);
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
`;

interface LoginBoxProps {
    loginState: any;
}

const LoginBox = styled('div') <LoginBoxProps>`
    position: absolute;
    top: 60px;
    right: ${({ loginState }) => {
        if (loginState) {
            return '30px';
        } else {
            return '-160px';
        }
    }};
    width: 60px;
    height: 60px;
    color: white;
    font-size: 20px;
    transition: all 1s ease;
`;


const MainTitleContainer = styled.header`
    color: white;
    margin: 150px 0 15px 0;
    padding: 18px;
    display: flex;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, .5);
`;

const MainTitleImage = styled.div`
    font-size: 120px;
    font-weight: 600;
`;

const ContentContatiner = styled.article`
    font-size: 20px;
    padding: 15px;
    color: white;
    display: flex;
    justify-content: center;
`;

const SelectButton = styled.button`
    width: 200px;
    padding: 7px;
    margin-top: 50px;
    border-radius: 10px;
    font-size: 27px;
    font-weight: 800;
    color: white;
    background: rgba(0,0,0,0.3);
    transition: all 0.1s;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;


export default function Home() {
    const [loginButtonClick, setLoginButtonClick] = useState(false);

    //total-user Info
    const [userSocialId, setUserSocialId] = useState(null);
    const [userSocialName, setUserSocialName] = useState(null);
    const [provider, setProvider] = useState('' );

    console.log(userSocialId,userSocialName,provider);

    //set google-user Info
    const responseLogin = (response: any,tempProvider: any) => {
        console.log(response)
        if(tempProvider=='google'){
            setUserSocialId(response.googleId);
            setUserSocialName(response.profileObj.name);
            setProvider('google');
            window.sessionStorage.setItem('id',response.googleId);
            console.log(response.googleId);
            
            //localStorage.setItem('user',response.googleId);
        }else if(tempProvider=='kakao'){
            setUserSocialName(response.profile.kakao_account.profile.nickname);
            //localStorage.setItem('user',response.profile.id);
            window.sessionStorage.setItem('id',response.profile.id);
            setProvider('kakao');
        }

        
    }

    return (
        <HomeContainer>
            <LoginNavContainer>
                <LoginContainer onClick={() => setLoginButtonClick(!loginButtonClick)}>
                    로그인
                </LoginContainer>
                <LoginBox loginState={loginButtonClick}>
                    <GoogleLogin
                        clientId={googleApi}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}

                            >
                                <img src={google}
                                    alt='google_logo'
                                    style={{
                                        width: '50px',
                                        height: '50px'
                                    }}
                                />
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={res=>responseLogin(res,'google')}
                        onFailure={res=>console.log(1)}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                    <KakaoLogin
                        jsKey={kakaoApi}
                        useDefaultStyle
                        onSuccess={res=>responseLogin(res,'kakao')}
                        onFailure={res=>console.log(1)}                        
                        getProfile={true}
                    />
                </LoginBox>
            </LoginNavContainer>
            <MainTitleContainer>
                <MainTitleImage>
                    Lorem Ipsum
                </MainTitleImage>
            </MainTitleContainer>
            <ContentContatiner>
                {/* 
                    google user info test view
                */}
                <span style={{ color: 'black' }}>UserID: {userSocialId}</span>
                &nbsp;
                <span style={{ color: 'black' }}>UserName: {userSocialName}</span>
            </ContentContatiner>
            <Link to='/selectmenu'>
                <SelectButton>
                    Select
                </SelectButton>
            </Link>

        </HomeContainer>
    );
}