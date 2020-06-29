import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowIcon from '../../Images/arrowIcon.png';
import correctIcon from '../../Images/correct.png';
import discorrectIcon from '../../Images/discorrect.png';
import nextIcon from '../../Images/next.png';
import Price from './PriceContainer'
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

const NavButton = styled('button') <NavButtonProps>`
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

const NavLinkContainer = styled('div') <NavigationStateProps>`
  width: 70%;
  height: ${({ navState }) => {
    if (navState) {
      return '60px';
    } else {
      return '0';
    }
  }};
  display: flex;
  justify-content: center;
  transition: 0.5s ease;
  z-index: ${({ navState }) => {
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
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const GameContainer = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  background: ${(props) => props.theme.bgColor};
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
  state: 'WAIT' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
}

interface ImageBoxProps {
  state: 'WAIT' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
}

const LeftImageBox = styled('figure') <ImageBoxProps>`
  position: absolute;
  top: 11%;
  left: 11%;
  width: 77%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease;
`;

const LeftImage = styled('div') <LeftImageProps>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  background: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 0px 12px 5px ${(props) => props.theme.hoverColor};
    // -ms-transform: scale(1.06);
    // -webkit-transform: scale(1.06);
    // transform: scale(1.06);
  }
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



const RightImageBox = styled('figure') <ImageBoxProps>`
  position: absolute;
  top: 11%;
  left: 11%;
  width: 77%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
`;

const RightImage = styled('div') <RightImageProps>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  background: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 12px 5px ${(props) => props.theme.hoverColor};
    // -ms-transform: scale(1.06);
    // -webkit-transform: scale(1.06);
    // transform: scale(1.06);
  }
`;
const NextImageContainer = styled('div') <ResultProps>`
position: absolute;

top:85%;
vertical-align:middle;
font-size: 40px
display: none;
z-index:5;

&:hover {
  box-shadow: 0px 0px 12px 5px ${(props) => props.theme.hoverColor};
  // -ms-transform: scale(1.06);
  // -webkit-transform: scale(1.06);
  // transform: scale(1.06);
}

display: ${({ state }) => {

    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
`;





interface ResultProps {
  state: 0 | 1 | 2;
}
const ResultContainer = styled('div') <ResultProps>`
  position: absolute;
  width:30%;
  height:30%;
  vertical-align:middle;  
  display: none;
  z-index:3;
  background-image: url(${({ state }) => {
    if (state == 1) {
      return correctIcon;
    } else {
      return discorrectIcon;
    }
  }});
  background-repeat: no-repeat;
  
  background-size: contain;
  
  background-position:center;
  display: ${({ state }) => {

    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
`;


const LeftPriceContainer = styled('div') <ResultProps>`
background: #111d27;
color: #111;

  position: absolute;
  top: 30%;
  left: 75%;
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
 
 
`;
const RightPriceContainer = styled('div') <ResultProps>`
  background: #111d27;
  color: #111;

  position: absolute;
  top: 30%;
  right: 75%;
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
 
`;

const ScoreContainer = styled('div')`
  position: absolute;
  top: 0%;
  right: 0%;
  font-size:100px;
  z-index:6;
`;

interface gProps {
  clickState: any;
  // ClickState: any;
  LeftData: any;
  RightData: any;
  //LeftClick: any;
  //RightClick: any;
  ClickImage: any;
  NextClick: any;
  Score: any;
  TotalScore: any;
}

function Game({
  clickState,
  // ClickState,
  LeftData,
  RightData,
  ClickImage,
  NextClick,
  Score,
  TotalScore
}: gProps) {
  const [navState, setNavState] = useState(false);
  console.log(LeftData,RightData)
  return (
    <>
      <NavigationContainer>
        <NavLinkContainer navState={navState}>
          <Link to={'/'}>
            <HomeButton>HOME</HomeButton>
          </Link>
        </NavLinkContainer>
        <NavButtonContainer>
          <NavButton url={arrowIcon} onClick={() => setNavState(!navState)} />
        </NavButtonContainer>
      </NavigationContainer>
      <ScoreContainer>{Score}/{TotalScore}</ScoreContainer>
      <GameContainer>
        <ResultContainer state={clickState}>
        </ResultContainer>
        <LeftImageContainer>
          <LeftImageBox state={clickState}>
            <LeftImage
              url={LeftData.url}
              state={clickState}
              onClick={() => ClickImage('left',LeftData,RightData)}
            />
          </LeftImageBox>
          <LeftPriceContainer state={clickState}>
            <Price detail={LeftData.detail} instagram = {LeftData.instagram}/>
          </LeftPriceContainer>
        </LeftImageContainer>
        <NextImageContainer state={clickState} >
          <img src={nextIcon} onClick={() => NextClick()}></img>
        </NextImageContainer>
        <RightImageContainer>
          <RightImageBox state={clickState}>
            <RightImage
              url={RightData.url}
              onClick={() => ClickImage('right',LeftData,RightData)}
            />
          </RightImageBox>
          <RightPriceContainer state={clickState}>
            <Price detail={RightData.detail} instagram = {RightData.instagram} />
          </RightPriceContainer>
        </RightImageContainer>
      </GameContainer>
    </>
  );
}

export default Game;
