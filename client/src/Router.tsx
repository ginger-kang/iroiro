import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './routes/Home/Home';
import Game from './routes/Game/Game';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/game' component={Game} />
            </Switch>
        </BrowserRouter>
    );
}