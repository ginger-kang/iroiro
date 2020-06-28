import React, { useEffect } from 'react';
import styled from 'styled-components';

const StylesPhotoContainer = styled.figure`
  width: 90%;

  & img {
    width: 100%;
    height: 300px;
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
    for (let i = 0; i < 12; i++) {
      orderArray.push(i);
    }
    shuffledData = shuffleImageData(orderArray);
    console.log(PhotoData);
  }, []);

  return (
    <StylesPhotoContainer>
      <img src={PhotoData.url} alt="1" />
    </StylesPhotoContainer>
  );
}
