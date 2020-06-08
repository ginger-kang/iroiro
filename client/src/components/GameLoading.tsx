import React from 'react';
import styled from 'styled-components';
import loadingIcon from '../Images/loadingIcon.png';

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
    background-color: #efefef;
`;

const LoadingBox = styled.div`
    width: 110px;
    height: 110px;
`;

interface LoadingIconProps {
    url: any;
}

const LoadingIcon = styled('div')<LoadingIconProps>`
    width: 100%;
    height: 100%;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center center;
    z-index: 2;
    transition: 1s ease;
    animation: LoadingIcon infinite 4s linear;
    @keyframes LoadingIcon {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
`;

function GameLoading() {
    return (
        <LoadingContainer>
            <LoadingBox>
                <LoadingIcon url={loadingIcon}/>
            </LoadingBox>
        </LoadingContainer>
    );
}

export default GameLoading;