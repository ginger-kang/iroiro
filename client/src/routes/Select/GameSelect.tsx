import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import priceTag from '../../Images/priceTag.png';
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const PriceGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: tomato;
  overflow: hidden;
`;

const PriceContentContainer = styled.article`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 30px;
  line-height: 1.3;
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
  width: 8vw;
  min-width: 62px;
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
  margin-bottom: 2vw;

  & img {
    margin-bottom: 15px;
    will-change: transform;
    transition: all 1s ease;
  }
`;

const PriceTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 2vw;
`;

export default function GameSelect() {
  return (
    <GameSelectContainer>
      <GameSelectNavContainer></GameSelectNavContainer>
      <SelectGame>
        <StyleGameContainer></StyleGameContainer>
        <PriceGameContainer>
          <PriceTitle>뭐가 더 비쌀까</PriceTitle>
          <PriceTagImageContainer>
            <img
              src={priceTag}
              alt="priceTag"
              style={{ width: '70%', minWidth: '100px' }}
            />
          </PriceTagImageContainer>
          <PriceContentContainer>
            <p>더 비싼 옷을 맞춰보세요. 옷 정보와 가격도 알아보세요!</p>
          </PriceContentContainer>
          <Link to="/game">
            <PriceStartButton>시작</PriceStartButton>
          </Link>
        </PriceGameContainer>
      </SelectGame>
    </GameSelectContainer>
  );
}
