import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home/Home';
import Game from './routes/Game/GameLogic';
import Admin from './routes/Admin/Admin';
import Styles from './routes/Styles/Styles';
import GameSelect from './routes/Select/GameSelect';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/admin" component={Admin} />
          <Route path="/style" component={Styles} />
          <Route path="/select" component={GameSelect} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
