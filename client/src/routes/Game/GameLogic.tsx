import React, { useState, useEffect } from 'react';
import Game from './Game';
import { StyleData } from './DataTemp';
import { PHOTOS } from './query';
import { Query, Mutation } from 'react-apollo';
import GameLoading from '../../components/GameLoading';
import ErrorPage from '../../components/ErrorPage';

interface lState {
    LeftImageindex: number;
    RightImageindex: number;
    state: 'START' | 'CLICK' | 'CLICKRESULT' | 'MOVE';
    ClickDirection: 'NOTYET' | 'LEFT' | 'RIGHT';
    LeftStyleData: any;
    RightStyleData: any;
}

let shuffledData: any = [];

const shuffleImageData = (a: any) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function GameLogic() {
    const [ state, setState ] = useState<string>('START'),
        [ ClickDirection, setClickDirection ] = useState<string>('NOTYET'),
        [ LeftImageindex, setLeftImageIndex ] = useState<number>(0),
        [ RightImageindex, setRightImageIndex ] = useState<number>(1),
        [ LeftStyleData, setLeftStyleImages ] = useState([]),
        [ RightStyleData, setRightStyleImages ] = useState([]);

    useEffect(() => {
        const orderArray: any = [];
        for ( let i = 0; i < 50; i++){
            orderArray.push(i);
        }
        shuffledData = shuffleImageData(orderArray);
    }, []);

    const AnswerDirection = (dir: string) => {
        //setState('CLICK');
        //setClickDirection(dir);
        // setTimeout(() => {
        //     setState('CLICKRESULT');
        // }, 2000);
        // console.log(dir);
        //checkList();
    }
    
    const LeftClick = () => {
        setTimeout(() => {
            setRightImageIndex(RightImageindex + 2);
            // setState('START');
            // setClickDirection('NOTYET');
        }, 1000);
        console.log(LeftImageindex, RightImageindex);
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

    return (
        <Query query={PHOTOS}
            notifyOnNetworkStatusChange={true}
            fetchPolicy={'cache-and-network'}>
            {({ loading, error, data }: any) => {
                if (loading) {
                    return (
                        <GameLoading />
                    );
                }
                if (error) {
                    return (
                        <ErrorPage />
                    );
                }
                return (
                    <Game
                        state={state}
                        ClickDirection={AnswerDirection}
                        LeftStyleImages={
                            data.Photos[shuffledData[LeftImageindex]]
                        }
                        RightStyleImages={
                            data.Photos[shuffledData[RightImageindex]]
                        }
                        LeftClick = {LeftClick}
                        RightClick = {RightClick}
                    />

                );
            }}
        </Query>
    );
}

export default GameLogic;