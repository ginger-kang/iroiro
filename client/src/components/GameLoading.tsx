import React from 'react';
import styled from 'styled-components';
import loadingIcon from '../Images/loadingIcon.svg';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bgColor};
`;

const LoadingBox = styled.div`
  width: auto;
  height: auto;
`;

const LoadingIcon = styled('div')`
  width: 100%;
  height: 100%;
  z-index: 2;
  transition: 1s ease;

  & img {
    animation: LoadingIcon infinite 1s ease-in-out both;
    @keyframes LoadingIcon {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

function GameLoading() {
  return (
    <LoadingContainer>
      <LoadingBox>
        <LoadingIcon>
          <img src={loadingIcon} alt="loading" />
        </LoadingIcon>
      </LoadingBox>
    </LoadingContainer>
  );
}

export default GameLoading;
