import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import client from '../apollo';
import { SET_USER_INFO } from '../query';
import InputUserInfo from './InputUserInfo';

const UserModalContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOpenButton = styled.button`
  width: 35px;
  height: 35px;
  background: ${(props) => props.theme.textColor};
  border-radius: 100%;
  font-size: 13px;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 100%;

  &:hover {
    background: red;
  }
`;

interface UserModalState {
  isOpen: boolean;
}

const UserModal = styled('div')<UserModalState>`
  position: fixed;
  top: 48%;
  left: 50%;
  display: ${({ isOpen }) => {
    if (isOpen) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.modalBgColor};
  border-radius: 6px;
  width: 30vw;
  height: 10vw;
  min-width: 300px;
  z-index: 500;
  transition: all 1s ease;
  transform: translateX(-50%) translateY(-50%) scale(1.05);
`;

function CreateUserInfo() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userIdState, setUserIdState] = useState<any>(
    window.sessionStorage.getItem('userId') || '',
  );

  const onSubmit = (inputValue: any) => {
    const { nickname, instagram } = inputValue;

    console.log(nickname);
    console.log(instagram);
    client
      .mutate({
        mutation: SET_USER_INFO,
        variables: {
          userId: window.sessionStorage.getItem('userId'),
          userNickName: nickname,
          userInstagram: instagram,
        },
      })
      .then((res) => {
        //res;
        alert('닉네임 변경 완료!');
      });
  };

  return (
    <UserModalContainer>
      <ModalOpenButton onClick={() => setModalIsOpen(!modalIsOpen)}>
        이름
      </ModalOpenButton>
      <UserModal isOpen={modalIsOpen}>
        <ModalCloseButton onClick={() => setModalIsOpen(!modalIsOpen)} />
        <InputUserInfo onSubmit={onSubmit} />
      </UserModal>
    </UserModalContainer>
  );
}

export default CreateUserInfo;
