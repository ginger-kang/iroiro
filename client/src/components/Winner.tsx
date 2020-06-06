import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import ImageData from '../routes/Game/DataTemp';
import instagram from '../Images/instagram.png';
import DancingDoodle from '../Images/doodle/DancingDoodle.png';

const WinnerContainer = styled.section`
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: row;
`;

const FirstContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    padding-top: 35px;

    & img {
        width: 16vw;
        height: 16vw;
        margin: 25px 0;
        border-radius: 100%;
        min-width: 150px;
        transition: all .5s ease;
        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
`;

const SecondContainer = styled.div`
    width: 30%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding-top: 35px;

    & img {
        width: 16vw;
        height: 16vw;
        margin: 25px 0;
        border-radius: 100%;
        min-width: 150px;
        cursor: pointer;

        transition: all .5s ease;
        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
`;

const ImageUploadContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
`;

const UserInputContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
`;


function Winner() {
    const [roundIndex, setRoundIndex] = useState(1);

    

    return (
        <>
            <WinnerContainer>
                <UserInputContainer>
                    <span style={{ color: 'black', fontSize: '2vw'}}>자신의 스타일을 뽐내보세요</span>
                    <ImageUploadContainer>
                        <img src={DancingDoodle} alt='dancingdoodle' style={{ width:'70%', minWidth:'200px'}} />
                        <ImageUpload/>
                    </ImageUploadContainer>
                </UserInputContainer>
                <FirstContainer>
                    <span style={{ color: 'black', fontSize: '1.8vw'}}>{roundIndex}회차</span>
                    <img src={ImageData[1].url} alt='1st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                    <img src={ImageData[11].url} alt='2st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                </FirstContainer>
                {/* <SecondContainer>
                    <span style={{ color: 'black', fontSize: '1.8vw'}}>2회차</span>
                    <img src={ImageData[10].url} alt='1st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                    <img src={ImageData[9].url} alt='2st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                </SecondContainer> */}
            </WinnerContainer>
        </>
    );
}

export default Winner;