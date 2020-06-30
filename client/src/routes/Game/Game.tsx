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

// const LeftImage = styled('div')<LeftImageProps>`
//   width: 100%;
//   height: 100%;
//   cursor: pointer;
//   transition: all 0.3s;
//   background-image: url(${({ url }) => url});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   border-radius: 10px;

//   &:hover {
//     box-shadow: 0px 0px 12px 5px ${(props) => props.theme.hoverColor};
//     // -ms-transform: scale(1.06);
//     // -webkit-transform: scale(1.06);
//     // transform: scale(1.06);
//   }
// `;
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

// const RightImage = styled('div')<RightImageProps>`
//   width: 100%;
//   height: 100%;
//   cursor: pointer;
//   transition: all 0.3s;
//   background-image: url(${({ url }) => url});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   border-radius: 10px;
//   &:hover {
//     box-shadow: 5px 5px 12px 5px ${(props) => props.theme.hoverColor};
//     // -ms-transform: scale(1.06);
//     // -webkit-transform: scale(1.06);
//     // transform: scale(1.06);
//   }
// `;
const NextImageContainer = styled('div')<ResultProps>`
position: absolute;
cursor: pointer;

top:85%;
vertical-align:middle;
font-size: 40px
display: none;

&:hover {
  
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
const ResultContainer = styled('div')<ResultProps>`
  position: absolute;
  top: 5%;
  width: 30%;
  height: 10%;
  vertical-align: middle;
  display: none;
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
`;

const LeftPriceContainer = styled('div')<ResultProps>`
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
`;
const RightPriceContainer = styled('div')<ResultProps>`
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
`;

const ScoreContainer = styled('article')`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all .5s ease;
  transform: translateX(-50%) translateY(-50%);
}


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
  TotalScore,
}: gProps) {
  console.log(LeftData, RightData);
  return (
    <>
      <GameContainer>
        <ScoreContainer>{Score}</ScoreContainer>
        <NavigationContainer>
          <Link to={'/select'}>
            <TiArrowBackOutline size={30} />
          </Link>
          <Link to={'/'}>
            <AiOutlineHome size={30} />
          </Link>
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
              {/* <LeftImage
                url={LeftData.url}
                state={clickState}
                onClick={() => ClickImage('left', LeftData, RightData)}
              /> */}
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
              {/* <RightImage
                url={RightData.url}
                onClick={() => ClickImage('right', LeftData, RightData)}
              /> */}
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
