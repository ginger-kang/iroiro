import React from 'react';
import styled from 'styled-components';

const GoogleContainer = styled.div`
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

const GoogleLogin = styled.button`
    width: 70px;
    heigth: 70px;
`;

function SelectMenu() {
    return (
        <GoogleContainer>
            <GoogleLogin>
                login
            </GoogleLogin>
        </GoogleContainer>
    );
}

export default SelectMenu;