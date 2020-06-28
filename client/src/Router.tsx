import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home/Home';
import Game from './routes/Game/GameLogic';
import Styles from './components/Styles';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/style" component={Styles} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
