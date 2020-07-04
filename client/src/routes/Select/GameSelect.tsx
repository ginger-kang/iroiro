import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import priceTag from '../../Images/priceTag.png';
import blackFloatDoodle from '../../Images/doodle/BlackFloatDoodle.svg';
import FloatDoodle from '../../Images/doodle/FloatDoodle.svg';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUpload } from 'react-icons/ai';
import { UPLOAD_PHOTO_FOR_GAME } from '../../query';
import { useForm } from 'react-hook-form';
import ParseDateString from '../../Services/ParseDateString';
import axios from 'axios';
import client from '../../apollo';
import CheckUser from '../../Services/CheckUser';
import topShirt from '../../Images/clothes.png';
import LoginBoxComponent from '../../components/LoginBox';

const GameSelectContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GameSelectNavContainer = styled.nav`
  width: 100%;
  height: 50px;
  background: ${(props) => props.theme.bgColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.01);

  & a {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.linkHoverBorderColor};
    }
  }

  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

const SelectGame = styled.section`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;

const StyleGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PriceGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PriceGameMain = styled('div')<DescriptionVisibility>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  display: ${({ isParticipation }) => {
    if (!isParticipation) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
`;
const PriceContentContainer = styled('article')`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1vw;
  }
`;

const PriceStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const PriceTagImageContainer = styled.figure`
  width: 300px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  @media screen and (min-width: 1150px) {
    width: 550px;
    height: 375px;
  }
`;

const PriceTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
`;

const StyleDoodleContainer = styled.figure`
  width: 300px;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  @media screen and (min-width: 1150px) {
    width: 550px;
    height: 375px;
  }
`;

const StyleContentContainer = styled.article`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1.2vw;
  }
`;

const StyleStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const StyleTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
`;

const UploadButton = styled.button`
  background: transparent;

  & img {
    height: 15px;
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
    margin-left: 10px;
  }
`;

interface DescriptionVisibility {
  isParticipation: boolean;
}

const FileUploadContainer = styled('section')<DescriptionVisibility>`
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

const ImageSubmitButton = styled('button')<WritePriceProps>`
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

  display: ${({ writeState }) => {
    if (writeState) {
      return 'grid';
    } else {
      return 'none';
    }
  }};
`;

const Input = styled.input`
  display: none;
`;

interface WritePriceProps {
  writeState: Boolean;
}

const SubmitPriceContainer = styled('div')<WritePriceProps>`
  height: 50%;

  & div {
    margin-bottom: 10px;
  }

  display: ${({ writeState }) => {
    if (writeState) {
      return 'grid';
    } else {
      return 'none';
    }
  }};
`;

const PreviewContainer = styled('div')<WritePriceProps>`
  text-align: center;
  display: ${({ writeState }) => {
    if (!writeState) {
      return 'grid';
    } else {
      return 'none';
    }
  }};
`;

const PriceButtons = styled.div`
  display: inline-flex;
`;

interface ShowLoginProps {
  showLoginBox: boolean;
}
const LoginBoxBox = styled('div')<ShowLoginProps>`
  display: ${({ showLoginBox }) => {
    if (showLoginBox) {
      return 'flex';
    } else {
      return 'none';
    }
  }};
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

export default function GameSelect() {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [isParticipation, setIsParticipation] = useState(false);
  const [writeState, setWriteState] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const [loginButtonClick, setLoginButtonClick] = useState<boolean>(false);
  const [userSocialId, setUserSocialId] = useState(
    window.sessionStorage.getItem('userId'),
  );
  const [userSocialName, setUserSocialName] = useState(
    window.sessionStorage.getItem('userName'),
  );

  const handleChange = (e: any) => {
    var file = e.target.files[0];

    setUploadedFileUrl(URL.createObjectURL(file));
  };

  const goToWritePrice = async () => {
    if (
      (await CheckUser(
        window.sessionStorage.getItem('userId'),
        window.sessionStorage.getItem('userName'),
      )) == false
    ) {
      setShowLoginBox(true);
    } else {
      setWriteState(true);
    }
  };

  const onSubmit = handleSubmit(
    async ({
      topName,
      topPrice,
      bottomName,
      bottomPrice,
      shoesName,
      shoesPrice,
      photo,
    }) => {
      if (
        await CheckUser(
          window.sessionStorage.getItem('userId'),
          window.sessionStorage.getItem('userName'),
        )
      ) {
        if (photo[0] == undefined) {
          alert('사진을 선택해주세요!');
        } else {
          var date = ParseDateString();
          var instagram = 'temp';
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
              setIsParticipation(false);
              setWriteState(false);
            })
            .catch(function (error) {
              alert('업로드 실패');
              setIsParticipation(false);
              setWriteState(false);
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
        }
      }
    },
  );

  return (
    <GameSelectContainer>
      <GameSelectNavContainer>
        <Link to="/">
          <AiOutlineHome size={30} />
        </Link>
      </GameSelectNavContainer>
      <SelectGame>
        <StyleGameContainer>
          <StyleDoodleContainer>
            {themeContext.bgColor === '#ffffff' ? (
              <img
                src={blackFloatDoodle}
                alt="blackfloatdoodle"
                style={{ width: '100%', height: '100%', minWidth: '200px' }}
              />
            ) : (
              <img
                src={FloatDoodle}
                alt="floatdoodle"
                style={{ width: '100%', height: '100%', minWidth: '200px' }}
              />
            )}
          </StyleDoodleContainer>
          <StyleContentContainer>
            <StyleTitle>제목</StyleTitle>
            <p>스타일을 찾아라</p>
            <Link to="/style">
              <StyleStartButton>시작</StyleStartButton>
            </Link>
          </StyleContentContainer>
        </StyleGameContainer>
        <PriceGameContainer>
          <PriceGameMain isParticipation={isParticipation}>
            <PriceTagImageContainer>
              <img
                src={priceTag}
                alt="priceTag"
                style={{ width: '60%', minWidth: '100px' }}
              />
            </PriceTagImageContainer>
            <PriceContentContainer>
              <PriceTitle>뭐가 더 비쌀까</PriceTitle>
              <PriceButtons>
                <p>더 비싼 옷을 맞춰보세요. 옷 정보와 가격도 알아보세요!</p>

                <UploadButton
                  onClick={() => setIsParticipation(!isParticipation)}
                >
                  <img src={topShirt}></img>
                </UploadButton>
              </PriceButtons>
              <Link to="/game">
                <PriceStartButton>시작</PriceStartButton>
              </Link>
            </PriceContentContainer>
          </PriceGameMain>
          <FileUploadContainer isParticipation={isParticipation}>
            <form onSubmit={onSubmit}>
              <SubmitPriceContainer writeState={writeState}>
                <InstaContainer>
                  Top
                  <input
                    name="topName"
                    placeholder="상의 정보"
                    ref={register}
                  />
                  <input
                    name="topPrice"
                    placeholder="가격 정보"
                    ref={register}
                  />
                </InstaContainer>
                <InstaContainer>
                  Bottom
                  <input
                    name="bottomName"
                    placeholder="하의 정보"
                    ref={register}
                  />
                  <input
                    name="bottomPrice"
                    placeholder="가격 정보"
                    ref={register}
                  />
                </InstaContainer>
                <InstaContainer>
                  Shoes
                  <input
                    name="shoesName"
                    placeholder="신발 정보"
                    ref={register}
                  />
                  <input
                    name="shoesPrice"
                    placeholder="가격 정보"
                    ref={register}
                  />
                </InstaContainer>
              </SubmitPriceContainer>
              <PreviewContainer writeState={writeState}>
                <Preview htmlFor="photo">
                  <PreviewP url={uploadedFileUrl}>
                    <AiOutlineUpload size={50} />
                  </PreviewP>
                </Preview>
              </PreviewContainer>
              <Input
                type="file"
                id="photo"
                name="photo"
                onChange={handleChange}
                ref={register}
              />
              <ImageSubmitButtonContainer>
                <ImageSubmitButton
                  type="button"
                  writeState={!writeState}
                  onClick={goToWritePrice}
                >
                  가격 작성
                </ImageSubmitButton>
                <ImageSubmitButton type="submit" writeState={writeState}>
                  착장 공유
                </ImageSubmitButton>
                <FileUploadCloseFButton
                  type="button"
                  onClick={() => {
                    if (writeState) {
                      setWriteState(false);
                    } else {
                      setIsParticipation(!isParticipation);
                    }
                  }}
                >
                  취소
                </FileUploadCloseFButton>
              </ImageSubmitButtonContainer>
            </form>
          </FileUploadContainer>
        </PriceGameContainer>
      </SelectGame>

      <LoginBoxComponent
        loginButtonClick={showLoginBox}
        setLoginButtonClick={setLoginButtonClick}
        setUserSocialId={setUserSocialId}
        setUserSocialName={setUserSocialName}
      />
    </GameSelectContainer>
  );
}
