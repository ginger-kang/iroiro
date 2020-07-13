import React, { useEffect } from 'react';
import styled from 'styled-components';

const { Kakao } = window;

interface sProps {
  photo: string;
  insta: string;
}

export default function StyleKakaoLink({ photo, insta }: sProps) {
  useEffect(() => {
    // Kakao.init('e6a3bdecfb22cff5501a62536f3152f1');
    Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '',
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
  }, []);

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
    <a id="kakao-link-btn" onClick={sendLink}>
      <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
    </a>
  );
}
