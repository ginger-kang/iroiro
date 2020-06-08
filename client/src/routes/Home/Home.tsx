import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

const HomeContainer = styled('section')`
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
        width: 23%;
        height: 23%;
        margin: 40px;

        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
`;

const KakaoButton = styled(KakaoLogin)`
    width: 20%;
    height: 25%;
    min-width: 85px;
    min-height: 85px;
    color: black;
    margin: 40px;
    background-color: #FFEB00;
    border-radius: 10px;
    font-size: 77px;
    text-align: center;
`;

const HomeContentContainer = styled('div')`
    color: black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    align-items: center;
    transition: all 1s ease;

    // & img {
    //     will-change: transform;
    //     transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-10deg) skew(0deg, 0deg);
    //     transform-style: preserve-3d;
    //     transition: all .5s ease;

    //     &:hover {
    //         transform: rotateZ(0deg);
    //     }
    // }
`;

const MainTitleImage = styled.div`
    font-size: 7vw;

    & svg {
        animation: fill 0.5s ease forwards 4.5s;
    
        & path:nth-child(1) {
            stroke-dasharray: 217px;
            stroke-dashoffset: 217px;
            animation: line-anim 2s ease forwards;
        }
        & path:nth-child(2) {
            stroke-dasharray: 298px;
            stroke-dashoffset: 298px;
            animation: line-anim 2s ease forwards 0.2s;
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
        & path:nth-child(8) {
            stroke-dasharray: 292px;
            stroke-dashoffset: 292px;
            animation: line-anim 2s ease forwards 1.9s;
        }
        & path:nth-child(9) {
            stroke-dasharray: 304.8536376953125px;
            stroke-dashoffset: 304.8536376953125px;
            animation: line-anim 2s ease forwards 2.3s;
        }
        & path:nth-child(10) {
            stroke-dasharray: 477px;
            stroke-dashoffset: 477px;
            animation: line-anim 2s ease forwards 2.7s;
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
                fill: black;
            }
        }

    }
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
            setLoginButtonClick(!loginButtonClick);
            //window.location.reload();
            
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
                                        width: '100%',
                                        height: '100%',
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
                        <svg id="logo "width="634" height="115" viewBox="0 0 634 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0779 70.8997H39.914V80.8015H6V6H17.0779V70.8997Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M72.403 81.7701C67.35 81.7701 62.7827 80.5144 58.7014 78.0031C54.6201 75.4201 51.4133 71.8325 49.0811 67.2403C46.7489 62.5765 45.5828 57.1951 45.5828 51.0961C45.5828 45.069 46.7813 39.7234 49.1783 35.0596C51.5752 30.3957 54.8468 26.8081 58.9929 24.2968C63.139 21.7854 67.771 20.5298 72.8889 20.5298C78.0068 20.5298 82.6388 21.7854 86.7849 24.2968C90.9311 26.8081 94.2026 30.3957 96.5996 35.0596C98.9966 39.7234 100.195 45.069 100.195 51.0961C100.195 57.1233 98.9642 62.4688 96.5024 67.1327C94.0406 71.7966 90.6719 75.4201 86.3962 78.0031C82.1853 80.5144 77.5209 81.7701 72.403 81.7701ZM72.403 71.1149C75.2535 71.1149 77.9096 70.3616 80.3714 68.8548C82.8979 67.348 84.9386 65.0878 86.4934 62.0742C88.0482 59.0606 88.8256 55.4013 88.8256 51.0961C88.8256 46.791 88.0806 43.1675 86.5906 40.2257C85.1006 37.2121 83.1247 34.9519 80.6629 33.4451C78.2011 31.9384 75.545 31.185 72.6946 31.185C69.8441 31.185 67.188 31.9384 64.7262 33.4451C62.3293 34.9519 60.4181 37.2121 58.9929 40.2257C57.5677 43.1675 56.8551 46.791 56.8551 51.0961C56.8551 57.4821 58.3127 62.433 61.2279 65.9488C64.208 69.3929 67.933 71.1149 72.403 71.1149Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M122.224 30.1087C123.844 27.0951 125.982 24.7632 128.638 23.1129C131.359 21.3908 134.565 20.5298 138.258 20.5298V33.2299H135.44C131.099 33.2299 127.795 34.4497 125.528 36.8892C123.325 39.3288 122.224 43.5622 122.224 49.5893V80.8015H111.146V21.4984H122.224V30.1087Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M197.514 49.697C197.514 51.9213 197.385 53.9303 197.125 55.7241H156.215C156.539 60.4598 158.126 64.2626 160.976 67.1327C163.827 70.0028 167.325 71.4378 171.471 71.4378C177.431 71.4378 181.642 68.6754 184.104 63.1505H196.056C194.437 68.6036 191.489 73.0881 187.214 76.604C183.003 80.0481 177.755 81.7701 171.471 81.7701C166.353 81.7701 161.754 80.5144 157.672 78.0031C153.656 75.4201 150.481 71.8325 148.149 67.2403C145.882 62.5765 144.748 57.1951 144.748 51.0961C144.748 44.9972 145.849 39.6517 148.052 35.0596C150.32 30.3957 153.462 26.8081 157.478 24.2968C161.559 21.7854 166.224 20.5298 171.471 20.5298C176.524 20.5298 181.027 21.7496 184.979 24.1891C188.93 26.6287 192.008 30.0728 194.21 34.5214C196.413 38.8983 197.514 43.9568 197.514 49.697ZM185.95 45.8224C185.886 41.302 184.428 37.6785 181.577 34.9519C178.727 32.2254 175.196 30.8621 170.985 30.8621C167.163 30.8621 163.892 32.2254 161.171 34.9519C158.45 37.6068 156.83 41.2302 156.312 45.8224H185.95Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M273.231 20.5298C277.442 20.5298 281.2 21.4984 284.504 23.4357C287.873 25.373 290.496 28.2431 292.375 32.046C294.318 35.8488 295.29 40.441 295.29 45.8224V80.8015H284.309V47.652C284.309 42.3424 283.111 38.2884 280.714 35.4901C278.317 32.62 275.045 31.185 270.899 31.185C266.753 31.185 263.449 32.62 260.987 35.4901C258.591 38.2884 257.392 42.3424 257.392 47.652V80.8015H246.411V47.652C246.411 42.3424 245.213 38.2884 242.816 35.4901C240.419 32.62 237.147 31.185 233.001 31.185C228.855 31.185 225.551 32.62 223.089 35.4901C220.692 38.2884 219.494 42.3424 219.494 47.652V80.8015H208.416V21.4984H219.494V28.279C221.308 25.8394 223.608 23.938 226.393 22.5747C229.179 21.2114 232.159 20.5298 235.333 20.5298C239.609 20.5298 243.431 21.5343 246.8 23.5434C250.169 25.5524 252.76 28.4584 254.574 32.2612C256.194 28.6736 258.72 25.8394 262.154 23.7586C265.587 21.6061 269.28 20.5298 273.231 20.5298Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M345.707 6V80.8015H334.629V6H345.707Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M371.329 30.2163C373.208 27.4897 375.767 25.1937 379.006 23.3281C382.245 21.4626 385.906 20.5298 389.987 20.5298C394.651 20.5298 398.895 21.8213 402.717 24.4044C406.604 26.9157 409.649 30.4674 411.851 35.0596C414.054 39.6517 415.155 44.9255 415.155 50.8809C415.155 56.8363 414.054 62.1818 411.851 66.9174C409.649 71.5813 406.604 75.2407 402.717 77.8955C398.895 80.4786 394.651 81.7701 389.987 81.7701C385.906 81.7701 382.278 80.8732 379.103 79.0794C375.929 77.2139 373.338 74.9178 371.329 72.1912V109H360.252V21.4984H371.329V30.2163ZM403.883 50.8809C403.883 46.791 403.106 43.2752 401.551 40.3333C400.061 37.3198 398.053 35.0596 395.526 33.5528C393.064 31.9742 390.408 31.185 387.558 31.185C384.772 31.185 382.116 31.9742 379.589 33.5528C377.128 35.1313 375.119 37.4274 373.564 40.441C372.074 43.4546 371.329 47.0063 371.329 51.0961C371.329 55.186 372.074 58.7736 373.564 61.8589C375.119 64.8725 377.128 67.1686 379.589 68.7471C382.116 70.3257 384.772 71.1149 387.558 71.1149C390.408 71.1149 393.064 70.3257 395.526 68.7471C398.053 67.0968 400.061 64.729 401.551 61.6437C403.106 58.5583 403.883 54.9707 403.883 50.8809Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M445.545 81.7701C441.334 81.7701 437.544 80.945 434.176 79.2947C430.872 77.5726 428.248 75.2766 426.305 72.4065C424.361 69.4646 423.325 66.1999 423.195 62.6123H434.662C434.856 65.1237 435.925 67.2403 437.868 68.9624C439.877 70.6127 442.371 71.4378 445.351 71.4378C448.46 71.4378 450.857 70.7921 452.542 69.5005C454.291 68.1372 455.166 66.4152 455.166 64.3344C455.166 62.1101 454.194 60.4598 452.25 59.3835C450.372 58.3072 447.359 57.1233 443.213 55.8318C439.196 54.612 435.925 53.4281 433.398 52.28C430.872 51.132 428.669 49.3741 426.79 47.0063C424.977 44.6385 424.07 41.5172 424.07 37.6426C424.07 34.4855 424.912 31.6155 426.596 29.0324C428.28 26.3776 430.677 24.2968 433.787 22.79C436.961 21.2832 440.589 20.5298 444.671 20.5298C450.76 20.5298 455.651 22.2518 459.344 25.6959C463.101 29.0683 465.11 33.6963 465.369 39.5799H454.291C454.097 36.9251 453.125 34.8084 451.376 33.2299C449.627 31.6513 447.262 30.8621 444.282 30.8621C441.367 30.8621 439.132 31.472 437.577 32.6917C436.022 33.9115 435.245 35.526 435.245 37.535C435.245 39.1135 435.763 40.441 436.799 41.5172C437.836 42.5935 439.099 43.4545 440.589 44.1003C442.079 44.6743 444.282 45.4277 447.197 46.3605C451.084 47.5085 454.259 48.6924 456.72 49.9122C459.247 51.0603 461.417 52.7823 463.231 55.0784C465.045 57.3744 465.984 60.4239 466.049 64.2267C466.049 67.5991 465.207 70.6127 463.523 73.2675C461.838 75.9223 459.441 78.0031 456.332 79.5099C453.287 81.0167 449.691 81.7701 445.545 81.7701Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M526.509 21.4984V80.8015H515.431V73.8056C513.682 76.2452 511.382 78.1825 508.532 79.6176C505.746 80.9808 502.766 81.6625 499.592 81.6625C495.381 81.6625 491.591 80.6938 488.222 78.7565C484.918 76.8192 482.295 73.9492 480.351 70.1463C478.473 66.3434 477.533 61.7513 477.533 56.3699V21.4984H488.514V54.5402C488.514 59.8499 489.712 63.9397 492.109 66.8098C494.506 69.6081 497.778 71.0073 501.924 71.0073C506.07 71.0073 509.342 69.6081 511.739 66.8098C514.2 63.9397 515.431 59.8499 515.431 54.5402V21.4984H526.509Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                            <path d="M605.941 20.5298C610.152 20.5298 613.91 21.4984 617.214 23.4357C620.582 25.373 623.206 28.2431 625.085 32.046C627.028 35.8488 628 40.441 628 45.8224V80.8015H617.019V47.652C617.019 42.3424 615.821 38.2884 613.424 35.4901C611.027 32.62 607.755 31.185 603.609 31.185C599.463 31.185 596.159 32.62 593.697 35.4901C591.3 38.2884 590.102 42.3424 590.102 47.652V80.8015H579.121V47.652C579.121 42.3424 577.923 38.2884 575.526 35.4901C573.129 32.62 569.857 31.185 565.711 31.185C561.565 31.185 558.261 32.62 555.799 35.4901C553.402 38.2884 552.204 42.3424 552.204 47.652V80.8015H541.126V21.4984H552.204V28.279C554.018 25.8394 556.317 23.938 559.103 22.5747C561.889 21.2114 564.869 20.5298 568.043 20.5298C572.319 20.5298 576.141 21.5343 579.51 23.5434C582.879 25.5524 585.47 28.4584 587.284 32.2612C588.903 28.6736 591.43 25.8394 594.863 23.7586C598.297 21.6061 601.99 20.5298 605.941 20.5298Z" stroke="black" stroke-width="5" mask="url(#path-1-outside-1)"/>
                        </svg>
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