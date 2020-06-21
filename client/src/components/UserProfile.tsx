import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineUpload } from 'react-icons/ai';
import client from '../apollo';
import { UPLOAD_PHOTO, USER_EXIST } from '../query';
import axios from 'axios';

const FileUploadContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const Input = styled.input`
  display: none;
`;

const Preview = styled.label`
position: absolute;
  left: 5px;
  top: 5px;
  display: inline-block;
  width: 5vw;
  height: 5vw;
  min-width: 120px;
  min-height: 120px;
  margin-bottom: 0;
  border-radius: 100%;
  color: ${(props) => props.theme.bgColor};
  background: ${(props) => props.theme.textColor};
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
  &:after {
    icon: ;
    font-family: 'fontawesome';
    color: #757575;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
  }
`;

const PreviewP = styled('div')<PrevImageProps>`
  background-image: url(${({ url }) => url});
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;



interface PrevImageProps {
  url: string;
}

function UserProfile() {
  
  const [uploadedFile, setUploadedFile] = useState({
    url: '',
    raw: '',
    name: '',
  });
  //It sends a request to upload to the server by storing the file object in the state
  //Post request to server when submitted
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    let userId = window.sessionStorage.getItem('userId');
    if (userId != null) {
      client
        .query({
          query: USER_EXIST,
          variables: { userId: window.sessionStorage.getItem('userId') },
        })
        .then((res) => {
          if (res.data.User != null) {
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

            var originalname = uploadedFile.name;
            var imageData = new FormData();

            imageData.append('image', uploadedFile.raw);
            imageData.append('imageId', date + '-' + originalname);

            client.mutate({
              variables: {
                owner: window.sessionStorage.getItem('userName'),
                category: 'temp',
                originalname: originalname,
                uploadDate: date,
              },
              mutation: UPLOAD_PHOTO,
            });

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
          }
        });
    } else {
      alert('로그인 해주세요!');
    }
  };


  const handleChange = (e: any) => {
    var file = e.target.files[0];

    setUploadedFile({
      url: URL.createObjectURL(file),
      raw: file,
      name: file.name,
    });
  };

  const uploadInput = useRef(null);

  return (
    
      <Upload>
        <Preview htmlFor="imageUpload">
          <PreviewP url={uploadedFile.url}>
            
          </PreviewP>
        </Preview>
        <Input type="file" id="imageUpload" onChange={handleChange} />        
      </Upload>
    
  );
}

export default UserProfile;