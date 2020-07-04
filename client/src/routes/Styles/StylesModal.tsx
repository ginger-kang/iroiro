import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const ModalContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.figure`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 35vw;
  height: 36vw;
  transition: all 1s ease;
  transform: translateX(-50%) translateY(-50%);

  & img {
    width: 100%;
    height: 100%;
  }
`;

const ModalCancelButton = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  background: none;

  & svg {
    color: white;
  }
`;

interface mProps {
  photo: string;
  showModal: boolean;
  hideModal: any;
}

export default function StylesModal({ photo, showModal, hideModal }: mProps) {
  return showModal ? (
    <ModalContainer>
      <Modal>
        <img src={photo} alt="photo" />
      </Modal>
      <ModalCancelButton onClick={hideModal}>
        <MdClose size={33} />
      </ModalCancelButton>
    </ModalContainer>
  ) : null;
}
