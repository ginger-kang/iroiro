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
    width: 50%;
    height: 100%;
    background: black; 
    border-radius: 7px;
    color: white;
    font-size: 100px;
    display: flex;
    align-items: center;
`;

const RightImageContainer = styled.div`
    width: 50%;
    height: 100%;
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
const LeftImage = styled.img`
    width: 100%;
    height: 100%;
`;
const RightImage = styled.img`
    width: 100%;
    height: 100%;
`;

export default function Game() {
<<<<<<< HEAD
    return <div> <img 
    src="https://showmethestyle225739-dev.s3.ap-northeast-2.amazonaws.com/jin.jpg"
    alt="new"
    /></div>;
=======
    return (
        <GameContainer>
            <LeftImageContainer>
            <LeftImage src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/94657479_538352420198900_169991785916993453_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=x9sPhFJNaP8AX9yjGVU&oh=7ab7c11e2681bc1b464ac1793e7f7aa8&oe=5EF5FC8E"/>
          
            </LeftImageContainer>
           
            <RightImageContainer>
            <RightImage src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/100948860_242816633713769_1220879730547570969_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=RmHCxKCAiF8AX-znwm5&oh=d4e308d2f4e23158da5c7b262dbeea2e&oe=5EF5F039"/>
            </RightImageContainer>
        </GameContainer>
    );
>>>>>>> master
}