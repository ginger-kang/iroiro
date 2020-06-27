import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import '../../css/price';


interface pProps {
    detail: any;
}

function Price({ detail }: pProps) {


    return (

        <ul className="pricing p-green">
            <li>
                <h3>{detail.top.name}</h3>
            </li>
            <li>{detail.top.price}</li>
            <li><h3>{detail.bottom.name}</h3></li>
            <li>{detail.bottom.price}</li>
            <li><h3>{detail.shoes.name}</h3></li>
            <li>{detail.shoes.price}</li>
            <li>
                <h3>{detail.top.price + detail.shoes.price + detail.shoes.price}</h3>
            </li>
            <li>
                <button>Join Now</button>
            </li>
        </ul>


    );
}

export default Price;
