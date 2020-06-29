import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import priceTag from '../../Images/priceTag.png';
import blackFloatDoodle from '../../Images/doodle/BlackFloatDoodle.svg';
import FloatDoodle from '../../Images/doodle/FloatDoodle.svg';

const GameSelectContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const GameSelectNavContainer = styled.nav`
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.9);
  position: relative;
  z-index: 11;
`;

const SelectGame = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const StyleGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceContentContainer = styled.article`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1vw;
  }
`;

const PriceStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const PriceTagImageContainer = styled.figure`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    margin-bottom: 15px;
    will-change: transform;
    transition: all 1s ease;
  }
`;

const PriceTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
`;

const StyleDoodleContainer = styled.figure`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleContentContainer = styled.article`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1.2vw;
  }
`;

const StyleStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

export default function GameSelect() {
  const themeContext = useContext(ThemeContext);

  return (
    <GameSelectContainer>
      <GameSelectNavContainer></GameSelectNavContainer>
      <SelectGame>
        <StyleGameContainer>
          <StyleDoodleContainer>
            {themeContext.bgColor === '#ffffff' ? (
              <img
                src={blackFloatDoodle}
                alt="blackfloatdoodle"
                style={{ width: '100%', minWidth: '200px' }}
              />
            ) : (
              <img
                src={FloatDoodle}
                alt="floatdoodle"
                style={{ width: '100%', minWidth: '200px' }}
              />
            )}
          </StyleDoodleContainer>
          <StyleContentContainer>스타일을 찾아라</StyleContentContainer>
          <Link to="/style">
            <StyleStartButton>시작</StyleStartButton>
          </Link>
        </StyleGameContainer>
        <PriceGameContainer>
          <PriceTagImageContainer>
            <img
              src={priceTag}
              alt="priceTag"
              style={{ width: '80%', minWidth: '100px' }}
            />
          </PriceTagImageContainer>
          <PriceContentContainer>
            <PriceTitle>뭐가 더 비쌀까</PriceTitle>
            <p>더 비싼 옷을 맞춰보세요. 옷 정보와 가격도 알아보세요!</p>
            <Link to="/game">
              <PriceStartButton>시작</PriceStartButton>
            </Link>
          </PriceContentContainer>
        </PriceGameContainer>
      </SelectGame>
    </GameSelectContainer>
  );
}
