import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import instagramLogo from '../../Images/instagramlogo.png';

interface pProps {
  detail: any;
  instagram: any;
}

function Price({ detail, instagram }: pProps) {
  return (
    <>
      <div>{detail.top.name}</div>
      <div>{detail.bottom.name}</div>
      <div>{detail.shoes.name}</div>
    </>
  );
}

export default Price;
