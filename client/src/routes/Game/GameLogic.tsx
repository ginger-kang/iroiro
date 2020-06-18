import React, { useState, useEffect } from 'react';
import Game from './Game';
import { PHOTOS } from '../../query';
import { Query, Mutation } from 'react-apollo';
import GameLoading from '../../components/GameLoading';
import ErrorPage from '../../components/ErrorPage';

interface lState {
  LeftImageindex: number;
  RightImageindex: number;
  clickstate: 'WAIT' | 'LEFTCLICK' | 'RIGHTCLICK' | 'CLICKRESULT';
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

function GameLogic<lState>() {
  const [clickState, setClickState] = useState<string>('WAIT'),
    // [ ClickState, setClickState ] = useState<string>('NOTYET'),
    [LeftImageindex, setLeftImageIndex] = useState<number>(0),
    [RightImageindex, setRightImageIndex] = useState<number>(1),
    [LeftStyleData, setLeftStyleImages] = useState([]),
    [RightStyleData, setRightStyleImages] = useState([]);

  useEffect(() => {
    const orderArray: any = [];
    for (let i = 0; i < 12; i++) {
      orderArray.push(i);
    }
    shuffledData = shuffleImageData(orderArray);
  }, []);

  const waitClick = (direction: string) => {
    if (direction === 'LEFT') {
      setTimeout(() => {
        setClickState('WAIT');
        setRightImageIndex(RightImageindex + 2);
      }, 2000);
    } else if (direction === 'RIGHT') {
      setTimeout(() => {
        setClickState('WAIT');
        setLeftImageIndex(LeftImageindex + 2);
      }, 2000);
    }
  };

  const LeftClick = () => {
    setClickState('LEFTCLICK');
    setTimeout(() => {
      clickResult('LEFT');
    }, 500);
    console.log(clickState);
  };

  const RightClick = () => {
    setClickState('RIGHTCLICK');
    setTimeout(() => {
      clickResult('RIGHT');
    }, 500);
    console.log(clickState);
  };

  const clickResult = (direction: string) => {
    setTimeout(() => {
      setClickState('CLICKRESULT');
      waitClick(direction);
    }, 2000);
    console.log(clickState);
  };

  return (
    <Query
      query={PHOTOS}
      notifyOnNetworkStatusChange={true}
      fetchPolicy={'cache-and-network'}
    >
      {({ loading, error, data }: any) => {
        if (loading) {
          return <GameLoading />;
        }
        if (error) {
          return <ErrorPage />;
        }
        if (data) {
          console.log(data);
        }
        return (
          <Game
            clickState={clickState}
            // ClickState={AnswerDirection}
            LeftStyleImages={data.Photos[shuffledData[LeftImageindex]]}
            RightStyleImages={data.Photos[shuffledData[RightImageindex]]}
            LeftClick={LeftClick}
            RightClick={RightClick}
          />
        );
      }}
    </Query>
  );
}

export default GameLogic;
