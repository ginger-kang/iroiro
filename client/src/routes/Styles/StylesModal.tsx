import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import StyleKakaoLink from './StyleKakaoLink';
import kakaolink from '../../Images/kakaolink.png';

const { Kakao } = window;

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

  @media screen and (max-width: 800px) {
    flex-direction: column;
    height: auto;
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
  width: 24vw;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 35vw;
  }
`;

const KakaoLinkBox = styled.button`
  width: 50%;
  min-width: 160px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #feeb00;
  color: black;

  & img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const LikedBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    color: white;
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
  const sendLink = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '스타일',
        description: insta,
        imageUrl: photo,
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          androidExecParams: 'test',
        },
      },
      social: {
        likeCount: 10,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
          },
        },
      ],
      success: function (response: any) {
        console.log(response);
      },
      fail: function (error: any) {
        console.log(error);
      },
    });
  };

  return showModal ? (
    <ModalContainer>
      <Modal>
        <img src={photo} alt="photo" />
        <IconContainer>
          <LikedBox>
            <AiOutlineHeart size={80} />
          </LikedBox>
          <KakaoLinkBox onClick={sendLink}>
            <img src={kakaolink} alt="kakaolink" />
            <span>카카오톡 공유하기</span>
          </KakaoLinkBox>
        </IconContainer>
      </Modal>
      <ModalCancelButton onClick={hideModal}>
        <MdClose size={33} />
      </ModalCancelButton>
    </ModalContainer>
  ) : null;
}
