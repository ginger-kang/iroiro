import React, { useState } from 'react';
import styled from 'styled-components';
// import { IMAGEQUERY } from './ImageQuery';

const GameContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #efefef;
`;

interface LeftImageContainerProps {
    state: 'START' | 'CLICK' | 'MOVE';
}

const LeftImageContainer = styled('div')<LeftImageContainerProps>`
    width: 50%;
    height: 150%;
    border-radius: 7px;
    color: white;
    font-size: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface LeftImageProps {
    url: any;
}


const LeftImage = styled('img')<LeftImageProps>`
    width: 68%;
    height: 75%;
    border-radius: 10px;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 10px 10px 10px;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

interface RightImageContainerProps {
    state: 'START' | 'CLICK' | 'MOVE';
}

const RightImageContainer = styled('div')<RightImageContainerProps>`
    width: 50%;
    height: 150%;
    border-radius: 7px;
    color: white;
    font-size: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface RightImageProps {
    url: string;
}

const RightImage = styled('img')<RightImageProps>`
    width: 68%;
    height: 75%;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s;
    box-shadow: 10px 10px 10px;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

const VersusImageContainer = styled.div`
    font-size: 70px;
    font-weight: 700;
    width: 100px;
    heigth: 100px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VersusIcon = styled.div`
    width: 100%;
    height: 100%;
    text-shadow: 2.3px 2.3px 3px rgba(0, 0, 0, .5);
`;

interface gProps {
    state: any;
    ClickDirection: any;
    LeftImageindex: number;
    RightImageindex: number;
    LeftStyleImages: any;
    RightStyleImages: any;
}

function Game ({ 
        state, 
        ClickDirection, 
        LeftImageindex, 
        RightImageindex, 
        LeftStyleImages, 
        RightStyleImages 
    }: gProps) {

    return (
        <GameContainer>
            <LeftImageContainer state={state}>
                {LeftStyleImages.map(( Leftlook:any ) => (
                    <LeftImage src={ Leftlook.url } url={ Leftlook.url }/>
                ))}
            </LeftImageContainer>
            <VersusImageContainer>
                <VersusIcon>
                    <span style={{ color: 'white' }}>VS</span>
                </VersusIcon>
            </VersusImageContainer>
            <RightImageContainer state={state}>
                {RightStyleImages.map(( Rightlook:any ) => (
                    <LeftImage src={ Rightlook.url } url={ Rightlook.url }/>
                ))};
            </RightImageContainer>
        </GameContainer>
    );
}

export default Game;