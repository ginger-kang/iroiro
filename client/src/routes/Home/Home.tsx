import React from 'react';
import SelectMenu from '../../components/Select';
import Winner from '../../components/Winner';
import Awarded from '../../components/Awarded';
import Main from '../../components/Main';

export default function Home() {
  return (
    <>
      <Main />
      <SelectMenu />
      <Winner />
      <Awarded />
    </>
  );
}
