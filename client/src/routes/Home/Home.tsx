import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
    top: 0;
    left: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-itmes: center;
`;

const MainTitle = styled.div`
    
`;

export default function Home() {
    return (
        <HomeContainer>
            <MainTitle title='SHOW ME THE STYLE'>
            </MainTitle>
        </HomeContainer>
    );
}