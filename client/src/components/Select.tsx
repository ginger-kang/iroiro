import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import ManDoodle from '../Images/doodle/DumpingDoodle.svg';
import blackManDoodle from '../Images/doodle/BlackDumpingDoodle.svg';
import WomanDoodle from '../Images/doodle/SprintingDoodle.svg';
import blackWomanDoodle from '../Images/doodle/BlackSprintingDoodle.svg';

const SelectPageContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  background: ${(props) => props.theme.secondBgColor};
  overflow: hidden;
  position: relative;
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

const ImageContainer = styled.section`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface scrollPosition {
  scrollPos: number;
}

const ManContainer = styled('section')<scrollPosition>`
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

const WomanContainer = styled('section')<scrollPosition>`
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

const ContentContainer = styled.article`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 7vw;
  line-height: 1.25;

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
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    window.addEventListener('scroll', getCurrentScroll);

    return () => window.removeEventListener('scroll', getCurrentScroll);
  });

  const getCurrentScroll = () => {
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 >=
      38
    ) {
      setScrollPosition(39);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 <
      38
    ) {
      setScrollPosition(-40);
    }
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
          소제목
        </span>
        <p>
          찾고있는 스타일이 있으신가요? 자신의 여자친구, 남자친구를 친한 친구들
          한테 소개시켜 줄 때 어떤 옷을 입히고 싶으신가요....
        </p>
        <p>
          두 개의 사진을 보고, 어느 쪽이 더 비싼 옷을 입고 있는지 맞춰보는
          게임을 즐겨보세요....
        </p>
      </ContentContainer>
      <ImageContainer>
        <ManContainer scrollPos={scrollPosition}>
          {themeContext.bgColor === '#ffffff' ? (
            <img
              src={blackManDoodle}
              alt="blackmandoodle"
              style={{ width: '100%', minWidth: '100px' }}
            />
          ) : (
            <img
              src={ManDoodle}
              alt="mandoodle"
              style={{ width: '100%', minWidth: '100px' }}
            />
          )}
          <Link to="/select">
            <StartButton>MAN</StartButton>
          </Link>
        </ManContainer>
        <WomanContainer scrollPos={scrollPosition}>
          {themeContext.bgColor === '#ffffff' ? (
            <img
              src={blackWomanDoodle}
              alt="blackwomandoodle"
              style={{ width: '100%', minWidth: '100px' }}
            />
          ) : (
            <img
              src={WomanDoodle}
              alt="womandoodle"
              style={{ width: '100%', minWidth: '100px' }}
            />
          )}
          <Link to="/select">
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
