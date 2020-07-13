import React, { useEffect } from 'react';
import styled from 'styled-components';
import kakaolink from '../../Images/kakaolink.png';

const KakaoLinkButton = styled.a``;

const { Kakao } = window;

interface sProps {
  photo: string;
  insta: string;
}

export default function StyleKakaoLink({ photo, insta }: sProps) {
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

  return (
    <>
      <KakaoLinkButton onClick={sendLink}>
        <img src={kakaolink} alt="kakaolink" />
      </KakaoLinkButton>
    </>
  );
}
