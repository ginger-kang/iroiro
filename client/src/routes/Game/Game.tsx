import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowIcon from '../../Images/arrowIcon.png';
import { url } from 'inspector';
import MeditatingDoodle from '../../Images/doodle/MeditatingDoodle.png';
import StyleData from './DataTemp';
import { AiFillStar } from 'react-icons/ai';


interface NavigationStateProps {
    navState: any;
}

const NavigationContainer = styled.nav`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
`;

interface NavButtonProps {
    url: any;
}

const NavButton = styled('button')<NavButtonProps>`
    width: 50px;
    z-index: 2;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

const NavButtonContainer = styled('div')`
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
`;

const NavLinkContainer = styled('div')<NavigationStateProps>`
    width: 70%;
    height: ${({navState}) => {
        if (navState) {
            return '60px';
        } else {
            return '0';
        }
    }};
    display: flex;
    justify-content: center;
    transition: .5s ease;
    z-index: ${({navState}) => {
        if (navState) {
            return '1';
        } else {
            return '0';
        }
    }};
`;

const HomeButton = styled.div`
    color: white;
    font-size: 40px;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`;

const GameContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    background: white;
`;

const LeftImageContainer = styled.section`
    position: relative;
    width: 50%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
`;

interface LeftImageProps {
    url: any;
}

interface ImageBoxProps {
    state: 'WAIT' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
}

const LeftImageBox = styled('div')<ImageBoxProps>`
    position: absolute;
    top: 11%;
    left: 11%;
    width: 77%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    trasnition: all 1s ease;
`;

const LeftImage = styled('div')<LeftImageProps>`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 1px 1px 1px;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100%;

    &:hover {
        -ms-transform: scale(1.06);
        -webkit-transform: scale(1.06);
        transform: scale(1.06);
    }
`;

const LeftResultModal = styled('div')<ImageBoxProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    color: yellow;
    font-size: 50px;
    display: flex;
    background: rgba(0,0,0,.5);
    justify-content: center;
    align-items: center;
    border-radius: 100%;

    display: ${({state}) => {
        switch (state) {
            case 'WAIT':
              return 'none';
            case 'LEFTCLICK':
              return 'flex';
            case 'RIGHTCLICK':
              return 'flex';
            case 'CLICKRESULT':
              return 'flex';
          }
        }
    };
`;

const RightImageContainer = styled.section`
    position: relative;
    width: 50%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
`;

interface RightImageProps {
    url: string;
}

interface ImageBoxProps {
    state: 'WAIT' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
}

const RightImageBox = styled('div')<ImageBoxProps>`
    position: absolute;
    top: 11%;
    left: 11%;
    width: 77%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    trasnition: all 1s ease;
`;

const RightImage = styled('div')<RightImageProps>`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 1px 1px 1px;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100%;
    &:hover {
        -ms-transform: scale(1.06);
        -webkit-transform: scale(1.06);
        transform: scale(1.06);
    }
`;

const RightResultModal = styled('div')<ImageBoxProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    color: yellow;
    font-size: 50px;
    display: flex;
    background: rgba(0,0,0,.5);
    justify-content: center;
    align-items: center;
    border-radius: 100%;

    display: ${({state}) => {
        switch (state) {
            case 'WAIT':
              return 'none';
            case 'LEFTCLICK':
              return 'flex';
            case 'RIGHTCLICK':
              return 'flex';
            case 'CLICKRESULT':
              return 'flex';
          }
        }
    };
`;

const VersusImageContainer = styled.div`
    position: absolute;
    top: 40%;
    font-size: 70px;
    font-weight: 700;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VersusIcon = styled.div`
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 100%;

    & img {
        width: 10vw;
        height: 10vw;
    }
`;

interface gProps {
    clickState: any;
    // ClickState: any;
    LeftStyleImages: any;
    RightStyleImages: any;
    LeftClick: any;
    RightClick: any;
}

function Game ({ 
        clickState, 
        // ClickState,
        LeftStyleImages, 
        RightStyleImages,
        LeftClick,
        RightClick,
    }: gProps) {
    
    const [ navState, setNavState ] = useState(false);

    return (
        <>
            <NavigationContainer>
                <NavLinkContainer navState={navState}>
                    <Link to={'/'}>
                        <HomeButton>
                            HOME
                        </HomeButton>
                    </Link>
                </NavLinkContainer>
                <NavButtonContainer>
                    <NavButton url={arrowIcon} 
                        onClick={() => 
                            setNavState(!navState)
                        }
                    />
                </NavButtonContainer>
            </NavigationContainer>
            <GameContainer>
                <LeftImageContainer>
                    <LeftImageBox state={clickState}>
                        <LeftImage 
                            url={ LeftStyleImages.url } 
                            onClick={() => 
                                LeftClick()
                            }
                        />
                        <LeftResultModal state={clickState}>
                            <AiFillStar size={47}/>50
                        </LeftResultModal>
                    </LeftImageBox>
                </LeftImageContainer>
                <VersusImageContainer>
                    <VersusIcon>
                        <img src={MeditatingDoodle} alt='meditatingDoodle' />
                    </VersusIcon>
                </VersusImageContainer>
                <RightImageContainer>
                    <RightImageBox state={clickState}>
                        <RightImage 
                            url={ RightStyleImages.url }
                            onClick={ () => 
                                RightClick()
                            }    
                        />
                        <RightResultModal state={clickState}>
                            <AiFillStar size={47}/>30
                        </RightResultModal>
                    </RightImageBox>
                </RightImageContainer>
            </GameContainer>
        </>
    );
}

export default Game;