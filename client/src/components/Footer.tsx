import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMail } from 'react-icons/fi';
import icecreamDoodle from '../Images/doodle/BlackIceCreamDoodle.svg';
import zombieDoodle from '../Images/doodle/BlackZombieingDoodle.svg';

interface ComponentVisual {
  isView: boolean;
}

const FooterContainer = styled('footer')<ComponentVisual>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.5s ease;
  background: ${(props) => props.theme.fifthBgColor};
  position: relative;

  & img {
    transition: all 1s ease;
    transform: ${({ isView }) => (isView ? 'scale(1)' : 'scale(1.15)')};
  }
`;

const ContactContainer = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  & span {
    margin-left: 5px;
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    color: ${(props) => props.theme.textColor};
  }
`;

const TitleContainer = styled.div`
  width: 15vw;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.textColor};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 2.5vw;
  & div {
    margin-bottom: 10px;
  }
`;

const Title = styled.div`
  cursor: pointer;
  font-family: 'Fugaz One', cursive !important;
`;

export default function Footer() {
  const [isView, setIsView] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', getCurrentScroll);

    return () => window.removeEventListener('scroll', getCurrentScroll);
  });

  const getCurrentScroll = () => {
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 >=
      92
    ) {
      setIsView(true);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 <
      92
    ) {
      setIsView(false);
    }
  };

  const handleScrollControll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  return (
    <FooterContainer isView={isView}>
      <img
        src={icecreamDoodle}
        alt="doodle"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '-15%',
          width: '65vw',
        }}
      />
      <img
        src={zombieDoodle}
        alt="doodle"
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-15%',
          width: '65vw',
        }}
      />
      <ContactContainer>
        <ContactBox>
          <div>
            <FiMail size={40} />
            <span>Contact</span>
          </div>
          <div>kdhoon07@gmail.com</div>
          <div>winnyiee@naver.com</div>
        </ContactBox>
      </ContactContainer>
      <TitleContainer>
        <Title onClick={handleScrollControll}>iroiro</Title>
        <div style={{ fontSize: 'small' }}>made by. gingerkang, winnyiee</div>
      </TitleContainer>
    </FooterContainer>
  );
}
