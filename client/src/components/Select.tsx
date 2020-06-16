import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { USER_EXIST } from '../query';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

import ManDoodle from '../Images/doodle/DumpingDoodle.svg';
import WomanDoodle from '../Images/doodle/SprintingDoodle.svg';

const SelectPageContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.secondBgColor};
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 710px) {
    flex-direction: column;
  }
`;

const StartButton = styled.button`
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

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface scrollPosition {
  scrollPos: number;
}

const ManContainer = styled('div')<scrollPosition>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    margin-bottom: 25px;
    will-change: transform;
    transform: translate3d(0px, ${({ scrollPos }) => scrollPos}px, 0px)
      scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
      skew(0deg, 0deg);
    transform-style: preserve-3d;

    transition: all 1s ease;
  }
`;

const WomanContainer = styled('div')<scrollPosition>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    margin-bottom: 25px;
    will-change: transform;
    transform: translate3d(0px, ${({ scrollPos }) => scrollPos}px, 0px)
      scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
      skew(0deg, 0deg);
    transform-style: preserve-3d;

    transition: all 1s ease;
  }
`;

const ContentContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 30px;
  line-height: 1.3;

  & p {
    font-size: 1vw;
  }
`;

const BottomLineContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: 0.1s ease;

  transform: translateX(-50%);

  & svg {
    & line {
      stroke: ${(props) => props.theme.borderColor};
    }
  }
`;

function SelectMenu() {
  // let userId = window.sessionStorage.getItem('userId');
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', getCurrentScroll);
  });

  const getCurrentScroll = () => {
    setScrollPosition(
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100,
    );
  };
  
  return (
    <SelectPageContainer>
      <ContentContainer>
        <span
          style={{
            fontSize: '2.5vw',
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
          }}
        >
          어떤 스타일을 선호하시나요?
        </span>
        <p>소개팅 자리에 나갈 때 무슨 옷을 입고가실지 고민하고 있으신가요?</p>
        <p>
          자신의 여자친구, 남자친구를 친한 친구들 한테 소개시켜 줄 때 어떤 옷을
          입히고 싶으신가요.
        </p>
      </ContentContainer>
      <ImageContainer>
        <ManContainer
          scrollPos={scrollPosition < 50 ? scrollPosition - 50 : 39}
        >
          <img
            src={ManDoodle}
            alt="manDoodle"
            style={{ width: '100%', minWidth: '200px' }}
          />
          <Link to="/game">
            <StartButton>MAN</StartButton>
          </Link>
        </ManContainer>
        <WomanContainer
          scrollPos={scrollPosition < 50 ? scrollPosition - 50 : 39}
        >
          <img
            src={WomanDoodle}
            alt="womanDoodle"
            style={{ width: '100%', minWidth: '200px' }}
          />
          <Link to="/game">
            <StartButton>WOMAN</StartButton>
          </Link>
        </WomanContainer>
      </ImageContainer>
      <BottomLineContainer>
        <svg
          width="159"
          height="3"
          viewBox="0 0 159 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.993976"
            y1="2.00002"
            x2="158.994"
            y2="1.04821"
            stroke="#242CE3"
            strokeWidth="2"
          />
        </svg>
      </BottomLineContainer>
    </SelectPageContainer>
  );
}

export default SelectMenu;
