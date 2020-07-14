import React from 'react';
import styled from 'styled-components';
import SelectMenu from '../../components/Select';
import Winner from '../../components/Winner';
import Awarded from '../../components/Awarded';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import CreateUserInfo from '../../components/CreateUser';

const LoginNavContainer = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100%;
`;

export default function Home() {
  return (
    <>
      <LoginNavContainer>
        <UserContainer>
          <CreateUserInfo />
        </UserContainer>
      </LoginNavContainer>
      <Main />
      <SelectMenu />
      <Winner />
      <Awarded />
      <Footer />
    </>
  );
}
