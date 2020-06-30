import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import client from '../apollo';
import { SET_USER_INFO, USER_EXIST } from '../query';
import { useQuery } from '@apollo/react-hooks';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useForm } from 'react-hook-form';
import ErrorPage from './ErrorPage';

import 'react-toastify/dist/ReactToastify.css';
import CheckUser from '../Services/CheckUser';

const UserModalContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOpenButton = styled.button`
  width: 100px;
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

const SubmitButton = styled.button`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 55px;
  height: 30px;
  border-radius: 6px;
  background: ${(props) => props.theme.pointColor};
  color: white;

  &:hover {
    background: #072ea7;
  }
`;

const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50%;
`;

const InstaContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

  & span {
    color: white;
    font-size: 1.1vw;
    margin-right: 15px;
  }

  & input {
    padding: 6px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(190, 190, 190, 0.99);
    border-radius: 6px;
    outline: none;
    color: white;
  }
`;

const NickNameContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

  & span {
    color: white;
    font-size: 1.1vw;
    margin-right: 15px;
  }

  & input {
    padding: 6px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(190, 190, 190, 0.99);
    border-radius: 6px;
    outline: none;
    color: white;
  }
`;
const UserModal = styled('div') <UserModalState>`
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


  const { register, handleSubmit } = useForm();

  const [userIdState, setUserIdState] = useState<string>(
    window.sessionStorage.getItem('userId') || 'a',
  );

  let { loading, error, data } = useQuery(USER_EXIST, {
    variables: { userId: userIdState },
  });

  if (loading) {
    return null;
  }
  if (error) {
    return <ErrorPage />;
  }

  if (data.User == null) {
    data = {
      User: {
        userNickName: 'Guest',
        userInstagram: 'Guest',
      },
    };

  }

  async function onSubmit(data: any){

    if (await CheckUser(window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('userName'))) {
      client
        .mutate({
          mutation: SET_USER_INFO,
          variables: {
            userId: window.sessionStorage.getItem('userId'),
            userNickName: data.userNickName,
            userInstagram: data.userInstagram,
          },
        })
        .then((res) => {
          toast.dark('👩‍🔧닉네임 변경 완료👨‍🔧', {
            transition: Slide,
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <UserModalContainer>
      <ModalOpenButton onClick={() => setModalIsOpen(!modalIsOpen)}>
        {data.User.userNickName || 'Guest'}
      </ModalOpenButton>

      <UserModal isOpen={modalIsOpen}>
        <ModalCloseButton onClick={() => setModalIsOpen(!modalIsOpen)} />

        <UserInfoForm onSubmit={handleSubmit(onSubmit)}>
          <NickNameContainer>
            <span>닉네임</span>
            <input
              name="userNickName"
              defaultValue={data.User.userNickName}
              ref={register({ maxLength: 20 })}
            />
          </NickNameContainer>
          <InstaContainer>
            <span>인스타</span>
            <input
              name="userInstagram"
              defaultValue={data.User.userInstagram || ''}
              ref={register({ maxLength: 20 })}
            />
          </InstaContainer>

          <SubmitButton type="submit">등록</SubmitButton>
        </UserInfoForm>
      </UserModal>
      <ToastContainer />
    </UserModalContainer>
  );
}

export default CreateUserInfo;
