import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowIcon from '../../Images/arrowIcon.png';
import correctIcon from '../../Images/correct.png';
import discorrectIcon from '../../Images/discorrect.png';
import nextIcon from '../../Images/next.png';
import homeIcon from '../../Images/home.png';
import Price from './PriceContainer';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlineHome } from 'react-icons/ai';

const NavigationContainer = styled.nav`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.theme.styleNavColor};
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.01);

  & a {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.linkHoverBorderColor};
    }
  }

  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

const GameContainer = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.bgColor};
`;

const ImageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface ImageBoxProps {
  state: 0 | 1 | 2;
}

const LeftImageContainer = styled.section`
  position: relative;
  width: 50%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftImageBox = styled('figure')<ImageBoxProps>`
  width: 35vw;
  height: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;

  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      box-shadow: 1px 1px 13px 10px ${(props) => props.theme.imageHoverColor};
    }
  }
`;

const RightImageContainer = styled.section`
  position: relative;
  width: 50%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface RightImageProps {
  url: string;
}

const RightImageBox = styled('figure')<ImageBoxProps>`
  width: 35vw;
  height: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;

  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      box-shadow: 1px 1px 13px 10px ${(props) => props.theme.imageHoverColor};
    }
  }
`;

const NextImageContainer = styled('div')<ResultProps>`
  position: absolute;
  cursor: pointer;
  left: 50%;
  bottom: 0;
  width: 7vw;
  vertical-align: middle;
  transition: all 0.5s ease;
  transform: translateX(-50%);
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};

  & img {
    width: 100%;
  }

  &:hover {
    transform: translateX(-40%);
  }
`;

interface ResultProps {
  state: 0 | 1 | 2;
}
const ResultContainer = styled('div')<ResultProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 13vw;
  height: 13vw;
  vertical-align: middle;
  z-index: 3;
  background-image: url(${({ state }) => {
    if (state == 1) {
      return correctIcon;
    } else {
      return discorrectIcon;
    }
  }});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  transition: all 0.3s ease;
  transform: translateX(-50%) translateY(-50%);
`;

const LeftPriceContainer = styled('ul')<ResultProps>`
  position: absolute;
  width: 35vw;
  height: 35vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  transition: all 0.5s ease;
`;
const RightPriceContainer = styled('ul')<ResultProps>`
  position: absolute;
  width: 35vw;
  height: 35vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: ${({ state }) => {
    if (state != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  transition: all 0.5s ease;
`;

const ScoreContainer = styled('div')`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8vw;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all .5s ease;
}


`;

interface gProps {
  clickState: any;
  LeftData: any;
  RightData: any;
  ClickImage: any;
  NextClick: any;
  Score: any;
  TotalScore: any;
}

function Game({
  clickState,
  LeftData,
  RightData,
  ClickImage,
  NextClick,
  Score,
  TotalScore,
}: gProps) {
  console.log(LeftData, RightData);
  return (
    <>
      <GameContainer>
        <NavigationContainer>
          <Link to={'/select'}>
            <TiArrowBackOutline size={30} />
          </Link>
          <Link to={'/'}>
            <AiOutlineHome size={30} />
          </Link>
          <ScoreContainer>{Score}</ScoreContainer>
        </NavigationContainer>
        <ResultContainer state={clickState}></ResultContainer>
        <ImageContainer>
          <LeftImageContainer>
            <LeftImageBox state={clickState}>
              <img
                src={LeftData.url}
                alt="left"
                onClick={() => ClickImage('left', LeftData, RightData)}
              />
            </LeftImageBox>
            <LeftPriceContainer state={clickState}>
              <Price detail={LeftData.detail} instagram={LeftData.instagram} />
            </LeftPriceContainer>
          </LeftImageContainer>
          <RightImageContainer>
            <RightImageBox state={clickState}>
              <img
                src={RightData.url}
                alt="right"
                onClick={() => ClickImage('right', LeftData, RightData)}
              />
            </RightImageBox>
            <RightPriceContainer state={clickState}>
              <Price
                detail={RightData.detail}
                instagram={RightData.instagram}
              />
            </RightPriceContainer>
          </RightImageContainer>
        </ImageContainer>
        <NextImageContainer state={clickState}>
          <img src={nextIcon} onClick={() => NextClick()}></img>
        </NextImageContainer>
      </GameContainer>
    </>
  );
}

export default Game;
