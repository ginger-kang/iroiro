import React, { useState } from 'react';
import Game from './Game';
import { StyleData } from './DataTemp';
import { PHOTOS } from './query';
import { Query, Mutation } from 'react-apollo';
interface lState {
    LeftImageindex: number;
    RightImageindex: number;
    state: 'START' | 'CLICK' | 'RESULT' | 'MOVE';
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
        //     setState('RESULT');
        // }, 2000);
        if ( dir === 'LEFT' ) {
            LeftClick();
        } else if ( dir === 'RIGHT' ) {
            RightClick();
        }
    }

    const LeftClick = () => {
        console.log(LeftImageindex, RightImageindex);
        console.log(state);
        setTimeout(() => {
            setLeftImageIndex(LeftImageindex + 2);
            // setState('START');
            // setClickDirection('NOTYET');
        }, 1000);
        console.log(state);
    }

    const RightClick = () => {
        console.log(LeftImageindex, RightImageindex);
        setTimeout(() => {
            setRightImageIndex(RightImageindex + 2);
            // setState('START');
            // setClickDirection('NOTYET');
        }, 1000);
        console.log(state);
        console.log(LeftStyleData);
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
        <Query query={PHOTOS}>
            {({ loading, error, data }: any) => {
                if (loading) {
                    return <div>loading</div>;
                }
                if (error) {
                    return <div>error</div>;
                }
                shuffledData = shuffle(data.photos);
                return (
                    <Game
                        state={state}
                        ClickDirection={AnswerDirection}
                        LeftStyleImages={[
                            shuffledData[LeftImageindex],
                            shuffledData[LeftImageindex + 2]
                        ]}
                        RightStyleImages={[
                            shuffledData[RightImageindex],
                            shuffledData[RightImageindex + 2]
                        ]}
                    />

                );
            }}
        </Query>
    );

}

export default GameLogic;