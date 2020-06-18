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
  min-width: 30px;
  border-radius: 6px;
  transform: translateY(-50%);

  & svg {
    width: 2vw;
  }

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
  min-width: 30px;
  border-radius: 6px;
  transform: translateY(-50%);

  & svg {
    width: 2vw;
  }

  &:hover {
    color: white;
    background: ${(props) => props.theme.pointColor};
  }
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
        <AiOutlineLeft size={27} />
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
        <AiOutlineRight size={27} />
      </NextRoundButton>
      <Contest />
    </AwardedContainer>
  );
}

export default Awarded;
