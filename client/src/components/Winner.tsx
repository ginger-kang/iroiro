import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import ImageData from '../routes/Game/DataTemp';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import DancingDoodle from '../Images/doodle/DancingDoodle.png';

const WinnerContainer = styled.section`
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    overflow: hidden;

`;

const WinnersContainer = styled('div')`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    & img {
        width: 16vw;
        height: 16vw;
        margin: 25px 0;
        border-radius: 100%;
        min-width: 150px;
        min-height: 150px;
        transition: all .5s ease;
        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
    & button {
        background: none;
        transition: all .5s ease;
        &:hover {
            -ms-transform: scale(1.1);
            -webkit-transform: scale(1.1);
            transform: scale(1.08);
        }
    }
`;

const ImageUploadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;

const UserInputContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const RoundContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


function Winner() {
    const [roundIndex, setRoundIndex] = useState(0);

    const leftButtonClick = () => {
        if ( roundIndex === 0) {
            setRoundIndex(2);
        }else {
            setRoundIndex( roundIndex - 1 );
        }
        console.log(roundIndex);
    }


    const rightButtonClick = () => {
        if ( roundIndex === 2) {
            setRoundIndex(0);
        }else {
            setRoundIndex( roundIndex + 1 );
        }
        console.log(roundIndex);
    }

    return (
        <>
            <WinnerContainer>
                <UserInputContainer>
                    <span style={{ color: 'black', fontSize: '2vw'}}>자신의 스타일을 뽐내보세요</span>
                    <ImageUploadContainer>
                        <img src={DancingDoodle} alt='dancingdoodle' style={{ width:'60%', minWidth:'200px'}} />
                        <ImageUpload />
                    </ImageUploadContainer>
                </UserInputContainer>
                <WinnersContainer>
                    <RoundContainer>
                        <button onClick={leftButtonClick}
                        ><AiOutlineLeft size={18}/></button>
                        <span style={{ 
                            color: 'black', fontSize: '1.8vw', margin: '0 10px'
                            }}
                        >{roundIndex+1}회차</span>
                        <button onClick={rightButtonClick}
                        ><AiOutlineRight size={18}/></button>
                    </RoundContainer>
                    <img src={ImageData[1].url} alt='1st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                    <img src={ImageData[11].url} alt='2st' />
                    <span style={{ color: 'black', fontSize: '1.5vw'}}>@yokota.mayuu</span>
                </WinnersContainer>
            </WinnerContainer>
        </>
    );
}

export default Winner;