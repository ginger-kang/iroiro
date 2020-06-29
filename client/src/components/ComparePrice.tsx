import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import priceTag from '../Images/priceTag.png';


const SelectPageContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.compareBgColor};
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

const ImageContainer = styled.section`
  width: 50%;
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



const ContentContainer = styled.article`
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

function ComparePrice() {
  // let userId = window.sessionStorage.getItem('userId');
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const themeContext = useContext(ThemeContext);

  const getCurrentScroll = () => {
    
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100 >= 60 ) {
      setScrollPosition(39);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100 < 60 ) {
      setScrollPosition(-40);
    }
  };

  window.addEventListener('scroll', getCurrentScroll);

  return (
    <SelectPageContainer>
      
      <ImageContainer>
        <ManContainer scrollPos={scrollPosition}>
          
            <img
              src={priceTag}
              alt="priceTag"
              style={{ width: '100%', minWidth: '100px' }}
            />
                    
        </ManContainer>        
      </ImageContainer>
      <ContentContainer>
        <span
          style={{
            fontSize: '2.5vw',
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
          }}
        >
          뭐가 더 비쌀까
        </span>
        <br></br>
        <p>더 비싼 옷을 맞춰보세요</p>
        <p>
          옷 정보와 가격도 알아보세요!
        </p>
        <br></br>
        <Link to="/game">
            <StartButton>시작</StartButton>
          </Link>
      </ContentContainer>
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

export default ComparePrice;
