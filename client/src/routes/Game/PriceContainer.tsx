import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import instagramLogo from '../../Images/instagramlogo.png';
import { AiOutlineLink } from 'react-icons/ai';

const TopContainer = styled.li`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 1.5vw;

  & h2 {
    font-size: 2vw;
  }
`;

const TopDetailContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & a {
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }
  }
`;

const BottomContainer = styled.li`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 1.5vw;

  & h2 {
    font-size: 2vw;
  }
`;

const BottomDetailContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ShoesContainer = styled.li`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 1.5vw;
  & h2 {
    font-size: 2vw;
  }
`;

const ShoesDetailContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const TotalContainer = styled.li`
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid white;
  font-size: 1.5vw;
  background: linear-gradient(45deg, #de6465b5, #7073cab3);

  & h2 {
    font-size: 2vw;
  }

  & p {
    font-size: 2vw;
  }
`;

const InstaInfoContainer = styled.li`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface pProps {
  detail: any;
  instagram: any;
}

function Price({ detail, instagram }: pProps) {
  return (
    <>
      <TopContainer>
        <h2>👕</h2>
        <TopDetailContainer>
          <p>
            {detail.top.name}
            <a
              onClick={() =>
                window.open(
                  'https://www.google.com/search?tbm=shop&q=' + detail.top.name,
                  '_blank',
                )
              }
            >
              <AiOutlineLink />
            </a>
          </p>
          <p>{detail.top.price}</p>
        </TopDetailContainer>
      </TopContainer>
      <BottomContainer>
        <h2>👖</h2>
        <BottomDetailContainer>
          <p>
            {detail.bottom.name}
            <a
              onClick={() =>
                window.open(
                  'https://www.google.com/search?tbm=shop&q=' +
                    detail.bottom.name,
                  '_blank',
                )
              }
            >
              <AiOutlineLink />
            </a>
          </p>
          <p>{detail.bottom.price}</p>
        </BottomDetailContainer>
      </BottomContainer>
      <ShoesContainer>
        <h2>👟</h2>
        <ShoesDetailContainer>
          <p>
            {detail.shoes.name}
            <a
              onClick={() =>
                window.open(
                  'https://www.google.com/search?tbm=shop&q=' +
                    detail.shoes.name,
                  '_blank',
                )
              }
            >
              <AiOutlineLink />
            </a>
          </p>
          <p>{detail.shoes.price}</p>
        </ShoesDetailContainer>
      </ShoesContainer>
      <TotalContainer>
        <h2>총합💰</h2>
        <p>{detail.top.price + detail.bottom.price + detail.shoes.price}</p>
      </TotalContainer>
      <InstaInfoContainer>
        <a
          onClick={() =>
            window.open('https://instagram.com/' + instagram, '_blank')
          }
        >
          <img
            src={instagramLogo}
            alt="instagram"
            style={{
              width: '23px',
              height: '23px',
              marginRight: '3px',
            }}
          />
          {instagram}
        </a>
      </InstaInfoContainer>
    </>
  );
}

export default Price;
