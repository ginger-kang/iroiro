import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineUpload } from 'react-icons/ai';
import client from '../apollo';
import { UPLOAD_PHOTO, USER_EXIST } from '../query';
import axios from 'axios';
import ParseDateString from '../Services/ParseDateString';
import CheckUser from '../Services/CheckUser';

interface DescriptionVisibility {
  isParticipation: boolean;
}

const DescriptionContainer = styled('section')<DescriptionVisibility>`
  width: 50%;
  height: 100%;
  display: ${({ isParticipation }) => {
    if (isParticipation) {
      return 'none';
    } else {
      return 'flex';
    }
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescriptionContent = styled.p`
  color: ${(props) => props.theme.textColor};
`;

const ParticipationButton = styled.button`
  width: 8vw;
  padding: 10px;
  min-width: 62px;
  border-radius: 6px;
  color: ${(props) => props.theme.bgColor};
  background: ${(props) => props.theme.textColor};
  font-size: 1.1vw;
  margin-top: 40px;

  &:hover {
    color: white;
    background: ${(props) => props.theme.pointColor};
  }
`;

const FileUploadContainer = styled('section')<DescriptionVisibility>`
  width: 50%;
  height: 100%;
  display: ${({ isParticipation }) => {
    if (isParticipation) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  transform: ${({ isParticipation }) => {
    if (isParticipation) {
      return 'translateX(0)';
    } else {
      return 'translateX(150%)';
    }
  }};
`;

const FileUploadCloseFButton = styled.button`
  width: 8vw;
  padding: 10px;
  min-width: 62px;
  border-radius: 6px;
  color: ${(props) => props.theme.bgColor};
  background: ${(props) => props.theme.textColor};
  font-size: 1.1vw;
  margin-top: 40px;

  &:hover {
    color: white;
    background: red;
  }
`;

const Input = styled.input`
  display: none;
`;

const Preview = styled.label`
  display: inline-block;
  width: 23vw;
  height: 23vw;
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

const ImageSubmitButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const ImageSubmitButton = styled.button`
  width: 8vw;
  padding: 10px;
  min-width: 62px;
  border-radius: 6px;
  color: ${(props) => props.theme.bgColor};
  background: ${(props) => props.theme.textColor};
  font-size: 1.1vw;
  margin-top: 40px;

  &:hover {
    color: white;
    background: ${(props) => props.theme.pointColor};
  }
`;

interface PrevImageProps {
  url: string;
}

function ImageUpload() {
  const [isParticipation, setIsParticipation] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({
    url: '',
    raw: '',
    name: '',
  });
  //It sends a request to upload to the server by storing the file object in the state
  //Post request to server when submitted
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    
    
    if (await CheckUser(window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('userName'))) {      
      var date = ParseDateString();

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
    <>
      <DescriptionContainer isParticipation={isParticipation}>
        <h1
          style={{
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
            fontSize: '2vw',
          }}
        >
          자신의 스타일을 뽐내보세요
        </h1>
        <DescriptionContent>
          자기 스타일 사진을 올려 다른 사람에게 보여주세요. 매일 토너먼트
          형식으로 진행되는 게임으로 자기 스타일에 대한 다른 사람들의 선호도를
          알 수 있습니다.
        </DescriptionContent>
        <ParticipationButton
          onClick={() => setIsParticipation(!isParticipation)}
        >
          참가하기
        </ParticipationButton>
      </DescriptionContainer>
      <FileUploadContainer isParticipation={isParticipation}>
        <Preview htmlFor="imageUpload">
          <PreviewP url={uploadedFile.url}>
            <AiOutlineUpload size={50} />
          </PreviewP>
        </Preview>
        <Input type="file" id="imageUpload" onChange={handleChange} />
        <ImageSubmitButtonContainer>
          <ImageSubmitButton onClick={handleSubmit}>Upload</ImageSubmitButton>
          <FileUploadCloseFButton
            onClick={() => setIsParticipation(!isParticipation)}
          >
            취소
          </FileUploadCloseFButton>
        </ImageSubmitButtonContainer>
      </FileUploadContainer>
    </>
  );
}

export default ImageUpload;
