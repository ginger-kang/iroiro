import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import ImageData from '../routes/Game/DataTemp';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import DancingDoodle from '../Images/doodle/DancingDoodle.svg';

const WinnerContainer = styled.section`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.thirdBgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
`;

const WinnersContainer = styled('div')`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
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

const ImageUploadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const UserInputContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
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

function Winner() {
  const [roundIndex, setRoundIndex] = useState(0);

  const leftButtonClick = () => {
    if (roundIndex === 0) {
      setRoundIndex(2);
    } else {
      setRoundIndex(roundIndex - 1);
    }
    console.log(roundIndex);
  };

  const rightButtonClick = () => {
    if (roundIndex === 2) {
      setRoundIndex(0);
    } else {
      setRoundIndex(roundIndex + 1);
    }
    console.log(roundIndex);
  };

  return (
    <>
      <WinnerContainer>
        <UserInputContainer>
          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '2vw',
            }}
          >
            자신의 스타일을 뽐내보세요
          </span>
          <ImageUploadContainer>
            <img
              src={DancingDoodle}
              alt="dancingdoodle"
              style={{ width: '85%', minWidth: '500px' }}
            />
            <ImageUpload />
          </ImageUploadContainer>
        </UserInputContainer>
        <WinnersContainer>
          <RoundContainer>
            <button onClick={leftButtonClick}>
              <AiOutlineLeft size={18} />
            </button>
            <span
              style={{
                color: `${({ props }: { props: any }) =>
                  props.theme.textColor}`,
                fontSize: '1.8vw',
                margin: '0 10px',
              }}
            >
              {roundIndex + 1}회차
            </span>
            <button onClick={rightButtonClick}>
              <AiOutlineRight size={18} />
            </button>
          </RoundContainer>
          <img src={ImageData[1].url} alt="1st" />
          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '1.5vw',
            }}
          >
            @yokota.mayuu
          </span>
          <img src={ImageData[11].url} alt="2st" />
          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '1.5vw',
            }}
          >
            @yokota.mayuu
          </span>
        </WinnersContainer>
      </WinnerContainer>
    </>
  );
}

export default Winner;
