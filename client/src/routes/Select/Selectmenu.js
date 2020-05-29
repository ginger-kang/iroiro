import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {GoogleLogin} from 'react-google-login';

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


const responseGoogle = (response) => {
    console.log(response);
}


function SelectMenu() {
    return (
        <GoogleContainer>
            <GoogleLogin
                clientId="578715869929-mutudhudc1bh26dmvljgko5ofo7f690j.apps.googleusercontent.com"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </GoogleContainer>
    );
}

export default SelectMenu;