import React from 'react';
import styled from 'styled-components';
import client from '../apollo';
import { SET_USER_INFO,USER_EXIST } from '../query';

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

function CreateUserInfo() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [nickNameState, setNicknameState] = React.useState<string>('');
  const [instagramState, setInstagramState] = React.useState<string>('');
  const [userIdState,setUserIdState] = React.useState<string>(window.sessionStorage.getItem('userId') || '');

  client.query({
    query:USER_EXIST,
    variables:{
      userId:userIdState
    }
  }).then((res)=>{
    
    setInstagramState(res.data.User.userInstagram);
    setNicknameState(res.data.User.userNickName);
  });

  const setUserInfo = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(nickNameState)
    client
      .mutate({
        mutation: SET_USER_INFO,
        variables: {
          userId: window.sessionStorage.getItem('userId'),
          userNickName: nickNameState,
          userInstagram: instagramState,
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
        <UserInfoForm onSubmit={setUserInfo}>
          <NickNameContainer>
            <span>닉네임</span>
            <input
              type="text"
              placeholder={nickNameState || "닉네임 입력!"}
              onChange={(e) => setNicknameState(e.target.value)}
            />
          </NickNameContainer>
          <InstaContainer>
            <span>인스타</span>
            <input
              type="text"
              placeholder={instagramState || "인스타ID 입력!"}
              onChange={(e) => setInstagramState(e.target.value)}
            />
          </InstaContainer>
          <SubmitButton type="submit">등록</SubmitButton>
        </UserInfoForm>
      </UserModal>
    </UserModalContainer>
  );
}

export default CreateUserInfo;
