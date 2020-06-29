import React, { useEffect } from 'react';
import styled from 'styled-components';

interface gridLayoutProps {
  layoutNumber: number;
}

const StylesPhotoContainer = styled('figure')<gridLayoutProps>`
  @media screen and (max-width: 1500px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 1040px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 845px) {
    width: 80vw;
    height: 80vw;
  }

  & img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: 2.5px 2.5px 5.5px rgba(0, 0, 0, 0.3);

    &:hover {
      transition: all 0.5s ease;
      transform: scale(1.03);
    }
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
  useEffect(() => {
    const orderArray: any = [];
    for (let i = 0; i < 10; i++) {
      orderArray.push(i);
    }
    shuffledData = shuffleImageData(orderArray);
  }, []);

  return (
    <StylesPhotoContainer layoutNumber={layoutNumber}>
      <img src={PhotoData.url} alt="photo"></img>
    </StylesPhotoContainer>
  );
}
