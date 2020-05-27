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

    const LoadImage = () => {
        setTimeout(() => {
            setLeftImageIndex(LeftImageindex + 2);
            setRightImageIndex(RightImageindex + 2);
            setState('START');
            setClickDirection('NOTYET');
        }, 1000);
    }

    const AnswerDirection = (dir: string) => {
        setState('CLICK');
        setClickDirection(dir);
        setTimeout(() => {
            setState('CLICKRESULT');
        }, 1000);
    }

    const shuffle = (a: any) => { 
        console.log(StyleData);
        let j, x, i; 
        for (i = a.length; i; i -= 1) { 
            j = Math.floor(Math.random() * i); 
            x = a[i - 1]; 
            a[i - 1] = a[j]; 
            a[j] = x; 
        }
        return a;
    }

    let shuffledData = shuffle(StyleData);

    return (
        <Game
            state = { state }
            ClickDirection = { ClickDirection }
            LeftImageindex = { LeftImageindex }
            RightImageindex = { RightImageindex }
            LeftStyleImages = {[ 
                shuffledData[ LeftImageindex ],
                shuffledData[ LeftImageindex + 2 ]   
            ]}
            RightStyleImages = {[ 
                shuffledData[ RightImageindex ],
                shuffledData[ RightImageindex + 2]   
            ]}
        />
                 
    );

}

export default GameLogic;