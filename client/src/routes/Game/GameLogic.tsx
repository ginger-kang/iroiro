import React, { useState, useEffect } from 'react';
import Game from './Game';
import { PHOTOS } from '../../query';
import { Query, Mutation } from 'react-apollo';
import GameLoading from '../../components/GameLoading';
import ErrorPage from '../../components/ErrorPage';
import { isNullOrUndefined } from 'util';



let shuffledData: any = [];

const shuffleImageData = (a: any) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function GameLogic<lState>() {
  const [clickState, setClickState] = useState<number>(0),
    // [ ClickState, setClickState ] = useState<string>('NOTYET'),
    [LeftImageindex, setLeftImageIndex] = useState<number>(0),
    [RightImageindex, setRightImageIndex] = useState<number>(1),
    [Score, setScore] = useState<number>(0),
    [TotalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const orderArray: any = [];
    for (let i = 0; i < 6; i++) {
      orderArray.push(i);
    }
    shuffledData = shuffleImageData(orderArray);
  }, []);



  const ShowResult = (side: String, LPrice: any, RPrice: any) => {


    if (side == 'left') {
      if (LPrice > RPrice) {
        //correct
        setClickState(1);
        setScore(Score + 1);
      } else {
        setClickState(2);
      }
      setTotalScore(TotalScore + 1)
    } else {
      if (LPrice > RPrice) {
        setClickState(2);
      } else {
        //correct
        setClickState(1);
        setScore(Score + 1);
      }
      setTotalScore(TotalScore + 1)
    }
  }



  const ClickImage = (side: any, LPrice: any, RPrice: any) => {
    LPrice = LPrice.detail.top.price + LPrice.detail.bottom.price + LPrice.detail.shoes.price + 2222222
    RPrice = RPrice.detail.top.price + RPrice.detail.bottom.price + RPrice.detail.shoes.price

    if (clickState == 0) {
      if (side == 'left') {
        if (LPrice > RPrice) {
          //correct
          setClickState(1);
          setScore(Score + 1);
        } else {
          setClickState(2);
        }
        setTotalScore(TotalScore + 1)
      } else {
        if (LPrice > RPrice) {
          setClickState(2);
        } else {
          //correct
          setClickState(1);
          setScore(Score + 1);
        }
        setTotalScore(TotalScore + 1)
      }
    }




  };

  const NextClick = () => {


    setClickState(0);
    setLeftImageIndex(LeftImageindex + 2);
    setRightImageIndex(RightImageindex + 2);


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

        return (
          <Game
            clickState={clickState}
            // ClickState={AnswerDirection}
            LeftData={data.Photos[shuffledData[LeftImageindex]]}
            RightData={data.Photos[shuffledData[RightImageindex]]}
            ClickImage={ClickImage}
            NextClick={NextClick}
            Score={Score}
            TotalScore={TotalScore}
          />
        );
      }}
    </Query>
  );
}

export default GameLogic;
