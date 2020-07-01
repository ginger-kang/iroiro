import { USER_EXIST, PHOTOS, CREATE_USER } from '../query';
import client from '../apollo';
import React, { useState, useEffect, useContext } from 'react';

const responseLogin = (response: any, tempProvider: any,setUserSocialId:any,setUserSocialName:any) => {
    
    let userIdForQuery: any;
    let userNameForQuery: any;


    if (tempProvider == 'google') {
      userIdForQuery = response.googleId;
      userNameForQuery = response.profileObj.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialId(userIdForQuery);
      setUserSocialName(userNameForQuery);
    } else if (tempProvider == 'kakao') {
      userIdForQuery = String(response.profile.id);
      userNameForQuery = response.profile.kakao_account.profile.nickname;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    } else if (tempProvider == 'naver') {
      userIdForQuery = String(response.id);
      userNameForQuery = response.name;
      window.sessionStorage.setItem('userId', userIdForQuery);
      window.sessionStorage.setItem('userName', userNameForQuery);
      setUserSocialName(userNameForQuery);
      setUserSocialId(userIdForQuery);
      //setLoginButtonClick(!loginButtonClick);
    }

    client
      .query({
        query: USER_EXIST,
        variables: { userId: userIdForQuery },
      })
      .then((res) => {
        if (res.data.User === null) {
          client.mutate({
            variables: {
              userId: userIdForQuery,
              userName: userNameForQuery,
              userNickName: null,
              userInstagram: null,
            },
            mutation: CREATE_USER,
          });
        }
      });
    window.location.reload();
  };


export default responseLogin;