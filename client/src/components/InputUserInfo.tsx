import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { USER_EXIST } from '../query';
import client from '../apollo';
import { useQuery } from '@apollo/react-hooks';

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

interface inputProps {
  onSubmit: any;
}

function InputUserInfo({ onSubmit }: inputProps) {
  const [nickNameState, setNicknameState] = useState<string>('');
  const [instagramState, setInstagramState] = useState<string>('');
  const [inputs, setInputs] = useState({
    nickname: '',
    instagram: '',
  });

  const { nickname, instagram } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const { loading, error, data } = useQuery(USER_EXIST, {
    variables: { userId: window.sessionStorage.getItem('userId') },
  });

  if (loading) {
    console.log('loading');
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data.User);
  }
  return (
    <UserInfoForm onSubmit={handleSubmit}>
      <NickNameContainer>
        <span>닉네임</span>
        {/* {data.User.userNickName === '' ? (
          <input
            name="nickname"
            placeholder="닉네임"
            onChange={onChange}
            value={nickname}
          />
        ) : ( */}
        {/* <input
          name="nickname"
          defaultValue={data.User.userNickName}
          onChange={onChange}
          value={nickname}
        /> */}
        {/* )} */}
      </NickNameContainer>
      <InstaContainer>
        <span>인스타</span>
        <input
          name="instagram"
          placeholder="인스타그램"
          onChange={onChange}
          value={instagram}
        />
      </InstaContainer>
      <SubmitButton type="submit">등록</SubmitButton>
    </UserInfoForm>
  );
}

export default InputUserInfo;
