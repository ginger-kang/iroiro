import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import SittingDoodle from '../Images/doodle/GroovySittingDoodle.svg';
import blackSittingDoodle from '../Images/doodle/BlackGroovySittingDoodle.svg';
import { AiFillRocket } from 'react-icons/ai';
import Login from './Login';

const HomeContainer = styled('header')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.5s ease;
  background: ${(props) => props.theme.firstBgColor};
`;

interface scrollPercentage {
  scrollPos: number;
}

const HomeContentContainer = styled('article')<scrollPercentage>`
  color: black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  align-items: center;
  transition: all 1s ease;
  & img {
    margin-bottom: 0px;
    will-change: transform;
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(${({ scrollPos }) => scrollPos}deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    transition: all 1.5s ease;
  }
`;

const DoodleContainer = styled.img`
  width: 60%;
`;

const MainTitleImage = styled.figure`
  font-size: 7vw;
  & svg {
    transition: all 1s ease;
    animation: fill 0.5s ease forwards 3s;
    width: 50vw;
    height: 10vw;
    & path {
      stroke: ${(props) => props.theme.textColor};
    }
    & path:nth-child(1) {
      stroke-dasharray: 390px;
      stroke-dashoffset: 390px;
      animation: line-anim 2s ease forwards 0.2s;
    }
    & path:nth-child(2) {
      stroke-dasharray: 391px;
      stroke-dashoffset: 391px;
      animation: line-anim 2s ease forwards 0.5s;
    }
    & path:nth-child(3) {
      stroke-dasharray: 435px;
      stroke-dashoffset: 435px;
      animation: line-anim 2s ease forwards 0.6s;
    }
    & path:nth-child(4) {
      stroke-dasharray: 390px;
      stroke-dashoffset: 390px;
      animation: line-anim 2s ease forwards 0.9s;
    }
    & path:nth-child(5) {
      stroke-dasharray: 391px;
      stroke-dashoffset: 391px;
      animation: line-anim 2s ease forwards 1s;
    }
    & path:nth-child(6) {
      stroke-dasharray: 435px;
      stroke-dashoffset: 435px;
      animation: line-anim 2s ease forwards 1.2s;
    }
    @keyframes line-anim {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes fill {
      from {
        fill: transparent;
      }
      to {
        fill: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const ContentContatiner = styled.p`
  font-size: 14px;
  padding: 15px;
  display: flex;
  justify-content: center;
  transition: all 1s ease;
  color: ${(props) => props.theme.textColor};
`;

interface displayRocket {
  dpRocket: number;
}

const ScrollController = styled('button')<displayRocket>`
  position: fixed;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
  transition: 1s ease;
  background: none;
  transition: all 1s ease;
  display: ${({ dpRocket }) => {
    if (dpRocket != 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  color: ${(props) => props.theme.textColor};
  z-index: 300;
  &:hover {
    transform: translateY(-10px);
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

function Main() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    window.addEventListener('scroll', getCurrentScroll);

    return () => window.removeEventListener('scroll', getCurrentScroll);
  });

  // console.log(
  //   ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100,
  // );

  const handleScrollControll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const getCurrentScroll = () => {
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 >=
      22
    ) {
      setScrollPosition(13);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 <
      22
    ) {
      setScrollPosition(0);
    }
  };

  return (
    <HomeContainer>
      <Login />
      <HomeContentContainer scrollPos={scrollPosition}>
        {themeContext.bgColor === '#ffffff' ? (
          <img
            src={blackSittingDoodle}
            alt="sittingdoodle"
            style={{ width: '60%' }}
          />
        ) : (
          <img
            src={SittingDoodle}
            alt="sittingdoodle"
            style={{ width: '60%' }}
          />
        )}
        <MainTitleImage>
          <svg
            width="528"
            height="159"
            viewBox="0 0 528 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.27 126.68C48.1833 126.68 50.78 126.047 53.06 124.78L52.11 146.25C46.1567 151.19 39.38 153.66 31.78 153.66C20.2533 153.66 12.78 151 9.36 145.68C7.08 142.133 5.94 138.397 5.94 134.47C5.94 130.417 6.19334 126.87 6.7 123.83L18.1 59.61H50.4L39.76 119.46C39.6333 120.22 39.57 120.917 39.57 121.55C39.57 124.97 41.47 126.68 45.27 126.68ZM21.9 28.64C21.9 20.5334 23.6733 14.6434 27.22 10.97C30.8933 7.17002 36.53 5.27002 44.13 5.27002C54.77 5.27002 60.09 9.95668 60.09 19.33C60.09 27.31 58.2533 33.1367 54.58 36.81C51.0333 40.4834 45.3967 42.32 37.67 42.32C27.1567 42.32 21.9 37.76 21.9 28.64Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
            <path
              d="M156.891 78.99C156.891 83.2967 156.131 87.4767 154.611 91.53C153.217 95.5834 151.824 98.56 150.431 100.46L148.341 103.12H119.651C122.817 100.207 124.401 96.5967 124.401 92.29C124.401 90.01 123.641 88.1734 122.121 86.78C120.727 85.26 118.764 84.5 116.231 84.5C111.924 84.5 108.187 86.6533 105.021 90.96L94.3805 151H62.0806L78.2305 59.61H108.251L105.971 72.34C113.191 62.08 121.931 56.95 132.191 56.95C140.424 56.95 146.567 58.9134 150.621 62.84C154.801 66.7667 156.891 72.15 156.891 78.99Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
            <path
              d="M219.148 56.95C232.828 56.95 243.152 59.9267 250.118 65.88C255.565 70.5667 258.288 77.09 258.288 85.45C258.288 88.2367 257.972 91.2767 257.338 94.57L253.348 116.8C250.942 130.227 245.305 139.727 236.438 145.3C227.698 150.873 215.982 153.66 201.288 153.66C186.595 153.66 175.828 150.873 168.988 145.3C163.922 141.12 161.388 134.85 161.388 126.49C161.388 123.577 161.705 120.347 162.338 116.8L166.328 94.57C170.762 69.49 188.368 56.95 219.148 56.95ZM224.278 98.37C224.532 97.1034 224.658 95.52 224.658 93.62C224.658 91.5934 223.835 89.3767 222.188 86.97C220.542 84.5634 217.628 83.36 213.448 83.36C209.395 83.36 205.975 84.7534 203.188 87.54C200.402 90.2 198.628 93.81 197.868 98.37L195.398 112.62C195.145 113.887 195.018 115.533 195.018 117.56C195.018 119.46 195.842 121.55 197.488 123.83C199.135 126.11 201.985 127.25 206.038 127.25C210.218 127.25 213.702 125.857 216.488 123.07C219.275 120.157 221.048 116.673 221.808 112.62L224.278 98.37Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
            <path
              d="M309.674 126.68C312.588 126.68 315.184 126.047 317.464 124.78L316.514 146.25C310.561 151.19 303.784 153.66 296.184 153.66C284.658 153.66 277.184 151 273.764 145.68C271.484 142.133 270.344 138.397 270.344 134.47C270.344 130.417 270.598 126.87 271.104 123.83L282.504 59.61H314.804L304.164 119.46C304.038 120.22 303.974 120.917 303.974 121.55C303.974 124.97 305.874 126.68 309.674 126.68ZM286.304 28.64C286.304 20.5334 288.078 14.6434 291.624 10.97C295.298 7.17002 300.934 5.27002 308.534 5.27002C319.174 5.27002 324.494 9.95668 324.494 19.33C324.494 27.31 322.658 33.1367 318.984 36.81C315.438 40.4834 309.801 42.32 302.074 42.32C291.561 42.32 286.304 37.76 286.304 28.64Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
            <path
              d="M421.295 78.99C421.295 83.2967 420.535 87.4767 419.015 91.53C417.622 95.5834 416.228 98.56 414.835 100.46L412.745 103.12H384.055C387.222 100.207 388.805 96.5967 388.805 92.29C388.805 90.01 388.045 88.1734 386.525 86.78C385.132 85.26 383.168 84.5 380.635 84.5C376.328 84.5 372.592 86.6533 369.425 90.96L358.785 151H326.485L342.635 59.61H372.655L370.375 72.34C377.595 62.08 386.335 56.95 396.595 56.95C404.828 56.95 410.972 58.9134 415.025 62.84C419.205 66.7667 421.295 72.15 421.295 78.99Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
            <path
              d="M483.552 56.95C497.232 56.95 507.556 59.9267 514.523 65.88C519.969 70.5667 522.693 77.09 522.693 85.45C522.693 88.2367 522.376 91.2767 521.742 94.57L517.753 116.8C515.346 130.227 509.709 139.727 500.842 145.3C492.102 150.873 480.386 153.66 465.693 153.66C450.999 153.66 440.232 150.873 433.392 145.3C428.326 141.12 425.793 134.85 425.793 126.49C425.793 123.577 426.109 120.347 426.742 116.8L430.733 94.57C435.166 69.49 452.772 56.95 483.552 56.95ZM488.682 98.37C488.936 97.1034 489.062 95.52 489.062 93.62C489.062 91.5934 488.239 89.3767 486.592 86.97C484.946 84.5634 482.033 83.36 477.853 83.36C473.799 83.36 470.379 84.7534 467.592 87.54C464.806 90.2 463.032 93.81 462.272 98.37L459.802 112.62C459.549 113.887 459.423 115.533 459.423 117.56C459.423 119.46 460.246 121.55 461.893 123.83C463.539 126.11 466.389 127.25 470.443 127.25C474.623 127.25 478.106 125.857 480.893 123.07C483.679 120.157 485.452 116.673 486.212 112.62L488.682 98.37Z"
              stroke="white"
              strokeWidth="7"
              mask="url(#path-1-outside-1)"
            />
          </svg>
        </MainTitleImage>
        <ContentContatiner>
          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '2.4vw',
            }}
          >
            자신의 스타일을 사람들에게 보여주세요
          </span>
        </ContentContatiner>
      </HomeContentContainer>
      <ScrollController
        onClick={handleScrollControll}
        dpRocket={scrollPosition}
      >
        <AiFillRocket
          size={40}
          color={`${({ props }: { props: any }) => props.theme.textColor}`}
        />
      </ScrollController>
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
    </HomeContainer>
  );
}

export default Main;
