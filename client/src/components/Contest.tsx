import React, { useState } from 'react';
import styled from 'styled-components';
import { CONTEST } from '../query';
import { useQuery } from '@apollo/react-hooks';
import GameLoading from './GameLoading';
import ErrorPage from './ErrorPage';
import instagram from '../Images/instagram.png';
import instagramlogo from '../Images/instagramlogo.png';

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
    min-width: 160px;
    min-height: 160px;
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

  @media screen and (max-width: 710px) {
    flex-direction: column;
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

function Contest() {
  const { loading, error, data } = useQuery(CONTEST, {
    variables: { round: 1 },
  });

  let url = '';
  if (loading) {
    return <GameLoading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  if (data) {
    console.log('contestdata', data.Contest[0]);
    url = 'https://www.instagram.com/' + data.Contest[0].instagram;
  }

  return (
    <WinnersContainer>
      <ManWinner>
        <img src={data.Contest[0].url} alt="1st" />
        <span
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '1.5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            onClick={() =>
              window.open(
                'https://instagram.com/' + data.Contest[0].instagram,
                '_blank',
              )
            }
          >
            <img
              src={instagramlogo}
              alt="instagram"
              style={{
                width: '23px',
                height: '23px',
                margin: '0',
                minWidth: '23px',
                minHeight: '23px',
              }}
            />
          </a>
          {data.Contest[0].owner}
        </span>
      </ManWinner>
      <WomanWinner>
        <img src={data.Contest[0].url} alt="2st" />
        <span
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '1.5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            onClick={() =>
              window.open(
                'https://instagram.com/' + data.Contest[0].instagram,
                '_blank',
              )
            }
          >
            <img
              src={instagramlogo}
              alt="instagram"
              style={{
                width: '23px',
                height: '23px',
                margin: '0',
                minWidth: '23px',
                minHeight: '23px',
              }}
            />
          </a>
          {data.Contest[0].owner}
        </span>
      </WomanWinner>
    </WinnersContainer>
  );
}

export default Contest;
