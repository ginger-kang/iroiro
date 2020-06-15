import React, { useState } from 'react';
import styled from 'styled-components';
import { CONTEST } from '../query';
import { useQuery } from '@apollo/react-hooks';
import GameLoading from './GameLoading';
import ErrorPage from './ErrorPage';

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

  if (loading) {
    return <GameLoading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  if (data) {
    console.log(data.Contest[0]);
  }

  return (
    <WinnersContainer>
      <ManWinner>
        <img src={data.Contest[0].url} alt="1st" />
        <span
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '1.5vw',
          }}
        >
          @{data.Contest[0].owner}
        </span>
      </ManWinner>
      <WomanWinner>
        <img src={data.Contest[0].url} alt="2st" />
        <span
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '1.5vw',
          }}
        >
          @{data.Contest[0].owner}
        </span>
      </WomanWinner>
    </WinnersContainer>
  );
}

export default Contest;
