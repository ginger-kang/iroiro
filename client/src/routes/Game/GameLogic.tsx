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
    state: 'START' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
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

function GameLogic<lState> () {
    const [ state, setState ] = useState<string>('START'),
        // [ ClickState, setClickState ] = useState<string>('NOTYET'),
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
    
    const LeftClick = () => {
        setState('LEFTCLICK');
        setTimeout(() => {
            setRightImageIndex(RightImageindex + 2);
            setState('START');
        }, 1000);
        console.log(state);
        console.log(LeftImageindex, RightImageindex);
    }

    const RightClick = () => {
        setState('RIGHTCLICK');
        console.log(LeftImageindex, RightImageindex);
        setTimeout(() => {
            // setState('START');
            // setClickDirection('NOTYET');
            setLeftImageIndex(LeftImageindex + 2);
            setState('START');
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
                        // ClickState={AnswerDirection}
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