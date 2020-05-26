import React from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const LeftImageContainer = styled.div`
    width: 600px;
    height: 600px;
    background: black; 
    border-radius: 7px;
    color: white;
    font-size: 100px;
    display: flex;
    align-items: center;
`;

const RightImageContainer = styled.div`
    width: 600px;
    height: 600px;
    border-radius: 7px;
    background: black; 
    color: white;
    font-size: 100px;
    display: flex;
    align-items: center;
`;

const VersusImageContainer = styled.div`
    font-size: 70px;
    font-weight: 700;
`;


export default function Game() {
    return (
        <GameContainer>
            <LeftImageContainer>
                Lorem Ipsum
            </LeftImageContainer>
            <VersusImageContainer>
                <span style={{ color: 'black' }}>V</span>
                <span style={{ color: 'black' }}>S</span>
            </VersusImageContainer>
            <RightImageContainer>
                Lorem Ipsum
            </RightImageContainer>
        </GameContainer>
    );
}