import React, { useState, useEffect, useContext } from 'react';
//import styled, { ThemeContext } from 'styled-components';
import '../../css/price';
import instagramLogo from '../../Images/instagramlogo.png';

interface pProps {
  detail: any;
  instagram: any;
}

function Price({ detail, instagram }: pProps) {
  return (
    <ul className="pricing p-green">
      <li>
        <h3>
          <a
            href={'https://www.google.com/search?tbm=shop&q=' + detail.top.name}
          >
            {detail.top.name}
          </a>
        </h3>
      </li>
      <li>{detail.top.price}</li>
      <li>
        <h3>
          <a
            href={
              'https://www.google.com/search?tbm=shop&q=' + detail.bottom.name
            }
          >
            {detail.bottom.name}
          </a>
        </h3>
      </li>
      <li>{detail.bottom.price}</li>
      <li>
        <h3>
          <a
            href={
              'https://www.google.com/search?tbm=shop&q=' + detail.shoes.name
            }
          >
            {detail.shoes.name}
          </a>
        </h3>
      </li>
      <li>{detail.shoes.price}</li>
      <li>
        <h3>총합</h3>
      </li>
      <li>
        <h3>{detail.top.price + detail.shoes.price + detail.shoes.price}</h3>
      </li>
      <li>
        <a
          onClick={() =>
            window.open('https://instagram.com/' + instagram, '_blank')
          }
        >
          <img
            src={instagramLogo}
            alt="instagram"
            style={{
              width: '23px',
              height: '23px',
              minWidth: '23px',
              minHeight: '23px',
            }}
          />
        </a>
      </li>
    </ul>
  );
}

export default Price;
