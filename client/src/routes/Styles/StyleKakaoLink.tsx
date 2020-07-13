import React, { useEffect } from 'react';
import styled from 'styled-components';

const { Kakao } = window;

export default function StyleKakaoLink() {
  useEffect(() => {
    // Kakao.init('e6a3bdecfb22cff5501a62536f3152f1');
    Kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '디저트 사진',
        description: '아메리카노, 빵, 케익',
        imageUrl:
          'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          androidExecParams: 'test',
        },
      },
      social: {
        likeCount: 10,
        commentCount: 20,
        sharedCount: 30,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 이동',
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
        description: '성진',
        imageUrl:
          'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
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
