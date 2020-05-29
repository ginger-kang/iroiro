import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SelectPageContainer = styled.div`
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
`;

const ImageUploadContainer = styled.div`
    width: 150px;
    height: 150px;
    background: rgba(0,0,0,.3);
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

function SelectMenu() {
    return (
        <SelectPageContainer>
            <ImageUploadContainer>
            </ImageUploadContainer>
            <Link to="/game">
                <StartButton>
                    START
                </StartButton>
            </Link>
        </SelectPageContainer>
    );
}

export default SelectMenu;