import React from 'react';

import Modal from 'react-modal';
import client from '../apollo';
import { SET_USER_NICKNAME } from '../query';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

function CreateNickName() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [nickNameState, setNicknameState] = React.useState('');
  const [instagramState, setInstagramState] = React.useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setNickname = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    client
      .mutate({
        mutation: SET_USER_NICKNAME,
        variables: {
          userId: window.sessionStorage.getItem('userId'),
          userNickName: nickNameState,
        },
      })
      .then((res) => {
        res;
        alert('닉네임 변경 완료!');
      });
  };

  const setInstagram = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    client
      .mutate({
        mutation: SET_USER_NICKNAME,
        variables: {
          userId: window.sessionStorage.getItem('userId'),
          userNickName: nickNameState,
        },
      })
      .then((res) => {
        res;
        alert('닉네임 변경 완료!');
      });
  };
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>

        <div>닉네임변경해라</div>
        <form onSubmit={setNickname}>
          <input
            type="text"
            id="inputNickName"
            defaultValue="닉네임 설정"
            onChange={(e) => setNicknameState(e.target.value)}
          />
          <button type="submit">Click</button>
        </form>
        <div>닉네임변경해라</div>
        <form onSubmit={setInstagram}>
          <input
            type="text"
            id="inputInstagram"
            defaultValue="닉네임 설정"
            onChange={(e) => setInstagramState(e.target.value)}
          />
          <button type="submit">Click</button>
        </form>
      </Modal>
    </div>
  );
}

export default CreateNickName;
