import React from 'react';
import styled from 'styled-components';
import SelectMenu from '../../components/Select';
import Winner from '../../components/Winner';
import Awarded from '../../components/Awarded';
import ComparePrice from '../../components/ComparePrice';
import Main from '../../components/Main';
import CreateUserInfo from '../../components/CreateUser';

const LoginNavContainer = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
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
      <ComparePrice />
      <Winner />
      <Awarded />
    </>
  );
}
