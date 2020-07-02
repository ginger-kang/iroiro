import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.figure`
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

const ModalCancelButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  color: white;
  cursor: pointer;
  background: white;
  border-radius: 100%;
  width: 15px;
  height: 15px;

  &:hover {
    background: red;
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
      <img src={photo} alt="photo" />
      <ModalCancelButton onClick={hideModal} />
    </ModalContainer>
  ) : null;
}
