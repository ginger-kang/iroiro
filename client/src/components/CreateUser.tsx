import React from 'react';

import Modal from 'react-modal';

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
  const [nickNameState, setNicknameState] = React.useState('닉네임설정해라');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function setNickname() {}
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
          <input type="text" value={nickNameState} />
        </form>
      </Modal>
    </div>
  );
}

export default CreateNickName;
