import React, { useState } from 'react';
import Game from './Game';
import { StyleData } from './DataTemp';

interface lState {
    LeftImageindex: number;
    RightImageindex: number;
    state: 'START' | 'CLICK' | 'CLICKRESULT' | 'MOVE';
    ClickDirection: 'NOTYET' | 'LEFT' | 'RIGHT';
    LeftStyleData: any;
    RightStyleData: any;
}

function GameLogic() {
    const [ state, setState ] = useState<string>('START'),
        [ ClickDirection, setClickDirection ] = useState<string>('NOTYET'),
        [ LeftImageindex, setLeftImageIndex ] = useState<number>(0),
        [ RightImageindex, setRightImageIndex ] = useState<number>(1),
        [ LeftStyleData, setLeftStyleImages ] = useState([]),
        [ RightStyleData, setRightStyleImages ] = useState([]);

    const AnswerDirection = (dir: string) => {
        //setState('CLICK');
        //setClickDirection(dir);
        // setTimeout(() => {
        //     setState('CLICKRESULT');
        // }, 2000);
        // console.log(dir);
        //checkList();
    }

    const shuffle = (a: any) => {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

    const orderArray: any = [];
        for (let i = 0; i < 10; i++) {
            orderArray.push(i);
    }
    const shuffledData = shuffle(orderArray);

    const LeftClick = () => {
        setTimeout(() => {
            setRightImageIndex(RightImageindex + 2);
            // setState('START');
            // setClickDirection('NOTYET');
        }, 1000);
        console.log(LeftImageindex, RightImageindex);
        console.log(orderArray);
        console.log(shuffledData);
    }

    const RightClick = () => {
        console.log(LeftImageindex, RightImageindex);
        setTimeout(() => {
            // setState('START');
            // setClickDirection('NOTYET');
            setLeftImageIndex(LeftImageindex + 2);
        }, 1000);
        console.log(state);
    }

    // const checkList = () => {
    //     console.log(shuffledData[ LeftImageindex ],
    //         shuffledData[ LeftImageindex + 2 ]);
    //     console.log(shuffledData[ RightImageindex ],
    //         shuffledData[ RightImageindex + 2]);
    // }

    return (
        <Game
            state = { state }
            ClickDirection = { AnswerDirection }
            LeftStyleImages = {[ 
                StyleData[ shuffledData[ LeftImageindex ] ],
                StyleData[ shuffledData[ LeftImageindex + 2 ] ]   
            ]}
            RightStyleImages = {[ 
                StyleData[ shuffledData[ RightImageindex ]],
                StyleData[ shuffledData[ RightImageindex + 2 ]]   
            ]}
            LeftClick = { LeftClick }
            RightClick = { RightClick }
        />
                 
    );

}

export default GameLogic;