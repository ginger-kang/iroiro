import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import instagramLogo from '../../Images/instagramlogo.png';
import StylesModal from './StylesModal';

interface gridLayoutProps {
  layoutNumber: number;
}

const StylesPhotoContainer = styled('figure')<gridLayoutProps>`
  @media screen and (max-width: 1500px) {
    width: 300px;
    height: 350px;
  }

  @media screen and (max-width: 1040px) {
    width: 400px;
    height: 450px;
  }

  @media screen and (max-width: 845px) {
    width: 68vw;
    height: 72vw;
  }

  & img {
    width: 100%;
    height: 85%;
    cursor: pointer;

    &:hover {
      transition: all 0.5s ease;
      transform: scale(1.03);
    }
  }
`;

const PhotoCaption = styled.figcaption`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const InstaInfoContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface sProps {
  PhotoData: any;
  layoutNumber: number;
}

let shuffledData: any = [];

const shuffleImageData = (a: any) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function StylesPhotos({ PhotoData, layoutNumber }: sProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [photoPath, setPhotoPath] = useState<string>('');

  useEffect(() => {
    const orderArray: any = [];
    for (let i = 0; i < 10; i++) {
      orderArray.push(i);
    }
    shuffledData = shuffleImageData(orderArray);
  }, []);

  const showModal = (photoProps: any) => {
    setModal(true);
    setPhotoPath(photoProps);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <>
      {PhotoData &&
        PhotoData.Photos.map((photo: any, i: number) => (
          <>
            <StylesPhotoContainer layoutNumber={layoutNumber} key={i}>
              <img
                src={photo.url}
                alt="photo"
                onClick={() => showModal(photo.url)}
              ></img>
              <PhotoCaption>
                <AiOutlineHeart size={22} />
                <InstaInfoContainer>
                  <a
                    onClick={() =>
                      window.open(
                        'https://instagram.com/' + photo.instagram,
                        '_blank',
                      )
                    }
                  >
                    <img
                      src={instagramLogo}
                      alt="instagram"
                      style={{
                        width: '23px',
                        height: '23px',
                        marginRight: '3px',
                      }}
                    />
                    {photo.instagram}
                  </a>
                </InstaInfoContainer>
              </PhotoCaption>
            </StylesPhotoContainer>
            <StylesModal
              photo={photoPath}
              showModal={modal}
              hideModal={() => hideModal()}
            />
          </>
        ))}
    </>
  );
}
