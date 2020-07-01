import React, { useState, useContext } from 'react';
import axios from 'axios';
import client from '../apollo'
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineUpload } from 'react-icons/ai';
import priceTag from '../Images/priceTag.png';
import CheckUser from '../Services/CheckUser';
import ParseDateString from '../Services/ParseDateString';
import { UPLOAD_PHOTO } from '../query';


const SelectPageContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.compareBgColor};
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 710px) {
    flex-direction: column;
  }
`;

const StartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 8vw;
  min-width: 62px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const UploadButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 8vw;
  min-width: 62px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const ImageContainer = styled.section`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface scrollPosition {
  scrollPos: number;
}

const ManContainer = styled('section') <scrollPosition>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    margin-bottom: 25px;
    will-change: transform;
    transform: translate3d(0px, ${({ scrollPos }) => scrollPos}px, 0px)
      scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
      skew(0deg, 0deg);
    transform-style: preserve-3d;

    transition: all 1s ease;
  }
`;



const ContentContainer = styled('article') <DescriptionVisibility>`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 30px;
  line-height: 1.3;
  display: ${({ isParticipation }) => {
    if (!isParticipation) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
  & p {
    font-size: 1vw;
  }
`;

const BottomLineContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: 0.1s ease;

  transform: translateX(-50%);

  & svg {
    & line {
      stroke: ${(props) => props.theme.borderColor};
    }
  }
`;



const InstaContainer = styled.div`
  display: flex;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

  & span {
    color: white;
    font-size: 1.1vw;
    margin-right: 15px;
    margin-left: 15px;
  }

  & input {
    padding: 6px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(190, 190, 190, 0.99);
    border-radius: 6px;
    outline: none;
    color: white;
    margin-left : 10px;
  }
`;



interface DescriptionVisibility {
  isParticipation: boolean;
}

const FileUploadContainer = styled('section') <DescriptionVisibility>`
  width: 50%;
  height: 100%;
  display: ${({ isParticipation }) => {
    if (isParticipation) {
      return 'grid';
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


interface PrevImageProps {
  url: string;
}
const PreviewP = styled('div') <PrevImageProps>`
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

const Input = styled.input`
  display: none;
`;

const SubmitPriceContainer = styled.div`
  height:50%;
`;

const PreviewContainer = styled.div`
  text-align:center;
`;

function ComparePrice() {
  // let userId = window.sessionStorage.getItem('userId');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isParticipation, setIsParticipation] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({
    url: '',
    raw: '',
    name: '',
  });

  const getCurrentScroll = () => {

    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100 >= 60) {
      setScrollPosition(39);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100 < 60) {
      setScrollPosition(-40);
    }
  };

  window.addEventListener('scroll', getCurrentScroll);

  const handleSubmit = async () => {
    console.log(2323)

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


  return (
    <SelectPageContainer>

      <ImageContainer>
        <ManContainer scrollPos={scrollPosition}>

          <img
            src={priceTag}
            alt="priceTag"
            style={{ width: '100%', minWidth: '100px' }}
          />

        </ManContainer>
      </ImageContainer>

      <ContentContainer isParticipation={isParticipation}>
        <span
          style={{
            fontSize: '2.5vw',
            color: `${({ props }: { props: any }) => props.theme.textColor}`,
          }}
        >
          뭐가 더 비쌀까
        </span>
        <br></br>
        <p>더 비싼 옷을 맞춰보세요</p>
        <p>
          옷 정보와 가격도 알아보세요!
        </p>
        <br></br>
        <Link to="/game">
          <StartButton>시작</StartButton>
        </Link>
        <UploadButton onClick={() => setIsParticipation(!isParticipation)}>내 착장 올리기</UploadButton>
      </ContentContainer>
      <FileUploadContainer isParticipation={isParticipation}>
        <SubmitPriceContainer>
          <InstaContainer>
            Top          
            <input
              name="topName"
              placeholder="상의 정보"
            />            
            <input
              name="topPrice"
              placeholder="가격 정보"
            />
          </InstaContainer>
          <InstaContainer>
            Bottom             
            <input
              name="bottomName"
              placeholder="하의 정보"
            />            
            <input
              name="bottomPrice"
              placeholder="가격 정보"
            />
          </InstaContainer>
          <InstaContainer>
            Shoes              
            <input
              name="shoesName"
              placeholder="신발 정보"
            />
            
            <input
              name="shoesName"
              placeholder="가격 정보"
            />
          </InstaContainer>
        </SubmitPriceContainer>     
        <PreviewContainer>
        <Preview htmlFor="imageUpload">
          <PreviewP url={uploadedFile.url}>
            <AiOutlineUpload size={50} />
          </PreviewP>
        </Preview>
        </PreviewContainer>   
        <Input type="file" id="imageUpload" onChange={handleChange} />
        <ImageSubmitButtonContainer>
          <ImageSubmitButton onClick={handleSubmit}>착장 공유</ImageSubmitButton>
          <FileUploadCloseFButton
            onClick={() => setIsParticipation(!isParticipation)}
          >
            취소
        </FileUploadCloseFButton>  
        </ImageSubmitButtonContainer>
        
      </FileUploadContainer>

      <BottomLineContainer>
        <svg
          width="159"
          height="3"
          viewBox="0 0 159 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.993976"
            y1="2.00002"
            x2="158.994"
            y2="1.04821"
            stroke="#242CE3"
            strokeWidth="2"
          />
        </svg>
      </BottomLineContainer>
    </SelectPageContainer>
  );
}

export default ComparePrice;
