import React from 'react';
import styled from 'styled-components';
import { Link }from 'react-router-dom';

const HomeContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainTitleContainer = styled.div`
    color: white;
    margin: 150px 0 15px 0;
    padding: 18px;
    display: flex;
`;

const MainTitleImage = styled.div`
    font-size: 120px;
    font-weight: 600;
`;

const ContentContatiner = styled.div`
    font-size: 20px;
    padding: 15px;
    color: white;
    display: flex;
    justify-content: center;
`;

const StartButton = styled.button`
    width: 200px;
    padding: 7px;
    margin-top: 50px;
    border-radius: 10px;
    font-size: 27px;
    font-weight: 800;
    color: white;
    background: rgba(0,0,0,0.3);
    transition: all 0.1s;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

export default function Home() {
    return (
        <HomeContainer>
            <MainTitleContainer>
                <MainTitleImage>
                    Lorem Ipsum
                </MainTitleImage>
            </MainTitleContainer>
            <ContentContatiner>
                ...
            </ContentContatiner>
            <Link to="/game">
                <StartButton>
                    START
                </StartButton>
            </Link>
        </HomeContainer>
    );
}