import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '../Images/ErrorIcon.png';

const ErrorPageContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 100;
`;

interface ErrorBoxProps {
    url: any;
}

const ErrorBox = styled('div')<ErrorBoxProps>`
    width: 110px;
    height: 110px;
    margin-bottom: 25px;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center center;
`;

function ErrorPage () {
    return (
        <ErrorPageContainer>
            <ErrorBox url={ErrorIcon}/>
            <span style={{
                fontSize: '30px',
                color: 'black'
                }}>
                오류가 발생했습니다. 새로고침 해주세요!
            </span>
        </ErrorPageContainer>
    );
}

export default ErrorPage;