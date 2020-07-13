import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import StyleKakaoLink from './StyleKakaoLink';

const ModalContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.figure`
  width: auto;
  height: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;

  & img {
    width: 40vw;
    height: 45vw;
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

const IconContainer = styled.div`
  width: 28vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & a {
    width: 70px;
    height: 70px;

    & img {
      width: 100%;
      height: 100%;
    }
  }
`;

interface mProps {
  photo: string;
  showModal: boolean;
  hideModal: any;
  insta: string;
}

export default function StylesModal({
  photo,
  showModal,
  hideModal,
  insta,
}: mProps) {
  return showModal ? (
    <ModalContainer>
      <Modal>
        <img src={photo} alt="photo" />
        <IconContainer>
          <StyleKakaoLink photo={photo} insta={insta} />
        </IconContainer>
      </Modal>
      <ModalCancelButton onClick={hideModal}>
        <MdClose size={33} />
      </ModalCancelButton>
    </ModalContainer>
  ) : null;
}
