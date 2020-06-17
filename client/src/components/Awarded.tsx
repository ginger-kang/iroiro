import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ImageData from '../routes/Game/DataTemp';
import Contest from './Contest';
const AwardedContainer = styled.section`
  width: 100%;
  height: 105vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: ${(props) => props.theme.fourthBgColor};
  position: relative;
`;

const WinnersContainer = styled('div')`
  width: 70%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  color: ${(props) => props.theme.textColor};

  & img {
    width: 16vw;
    height: 16vw;
    margin: 25px 0;
    border-radius: 10px;
    min-width: 150px;
    min-height: 150px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      -ms-transform: scale(1.05);
      -webkit-transform: scale(1.05);
      transform: scale(1.05);
    }
  }
  & button {
    background: none;
    transition: all 0.5s ease;
    &:hover {
      -ms-transform: scale(1.1);
      -webkit-transform: scale(1.1);
      transform: scale(1.08);
    }
  }
`;

const RoundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & button {
    color: ${(props) => props.theme.textColor};
  }
`;

const PrevRoundButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10%;
  transition: 0.1s ease;
  height: 8vw;
  width: 3.5vw;
  border-radius: 6px;
  transform: translateY(-50%);

  &:hover {
    color: white;
    background: ${(props) => props.theme.pointColor};
  }
`;

const NextRoundButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10%;
  transition: 0.1s ease;
  height: 8vw;
  width: 3.5vw;
  border-radius: 6px;
  transform: translateY(-50%);

  &:hover {
    color: white;
    background: ${(props) => props.theme.pointColor};
  }
`;

const ManWinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WomanWinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Awarded() {
  const [roundIndex, setRoundIndex] = useState(0);
  const leftButtonClick = () => {
    if (roundIndex === 0) {
      setRoundIndex(2);
    } else {
      setRoundIndex(roundIndex - 1);
    }
  };

  const rightButtonClick = () => {
    if (roundIndex === 2) {
      setRoundIndex(0);
    } else {
      setRoundIndex(roundIndex + 1);
    }
  };

  return (
    <AwardedContainer>
      <PrevRoundButton onClick={leftButtonClick}>
        <AiOutlineLeft size={40} />
      </PrevRoundButton>
      <RoundContainer>
        <span
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '2vw',
          }}
        >
          🎊 {roundIndex + 1}회 🎊
        </span>
      </RoundContainer>
      <NextRoundButton onClick={rightButtonClick}>
        <AiOutlineRight size={40} />
      </NextRoundButton>
      <Contest />
    </AwardedContainer>
  );
}

export default Awarded;
