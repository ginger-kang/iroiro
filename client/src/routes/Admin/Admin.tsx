import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import client from '../../apollo';
import { UPLOAD_PHOTO_FOR_GAME } from '../../query';
import axios from 'axios';

const AdminContainer = styled('div')`
  margin-top: 100px;
  margin-left: 100px;
  font-size: 20px;
`;

type FormData = {
  topName: string;
  topPrice: string;
  bottomName: string;
  bottomPrice: string;
  shoesName: string;
  shoesPrice: string;
  instagram: string;
  photo: any;
};

function Admin() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(
    ({
      topName,
      topPrice,
      bottomName,
      bottomPrice,
      shoesName,
      shoesPrice,
      instagram,
      photo,
    }) => {
      console.log;
      var today = new Date();
      var date =
        today.getFullYear() +
        ':' +
        (today.getMonth() + 1) +
        ':' +
        today.getDate() +
        ':' +
        today.getHours() +
        ':' +
        today.getMinutes() +
        ':' +
        today.getSeconds();
      var name2 = date + '-' + photo[0].name;
      var imageData = new FormData();

      imageData.append('image', photo[0]);
      imageData.append('imageId', name2);

      const config = {
        headers: { 'Content-type': 'multipart/form-data' },
      };

      axios
        .post('/upload', imageData, config)
        .then(function (response) {
          alert('이미지 업로드 성공');
        })
        .catch(function (error) {
          alert('업로드 실패');
        });

      client.mutate({
        variables: {
          owner: instagram,
          category: 'man',
          instagram: instagram,
          top1: topName,
          top2: Number(topPrice),
          bottom1: bottomName,
          bottom2: Number(bottomPrice),
          shoes1: shoesName,
          shoes2: Number(shoesPrice),
          url:
            'https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/man/' +
            name2,
          id: name2,
        },
        mutation: UPLOAD_PHOTO_FOR_GAME,
      });
    },
  );

  return (
    <AdminContainer>
      <form onSubmit={onSubmit}>
        상의
        <input type="text" id="topName" name="topName" ref={register} />
        <input type="text" id="topPrice" name="topPrice" ref={register} />
        <br></br>
        <br></br>
        하의
        <input type="text" id="bottomName" name="bottomName" ref={register} />
        <input type="text" id="bottomPrice" name="bottomPrice" ref={register} />
        <br></br>
        신발
        <input type="text" id="shoesName" name="shoesName" ref={register} />
        <input type="text" id="shoesPrice" name="shoesPrice" ref={register} />
        <br></br>
        인스타
        <input type="text" id="instagram" name="instagram" ref={register} />
        <br></br>
        <input type="file" id="photo" name="photo" ref={register} />
        <input type="submit" value="Submit" />
      </form>
    </AdminContainer>
  );
}

export default Admin;
