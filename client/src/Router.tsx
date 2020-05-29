import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './routes/Home/Home';
import Game from './routes/Game/GameLogic';
import SelectMenu from './routes/Select/Select';

const MainContainer = styled.div`
    position: relative;
    height: 100%;
`;

export default function Router() {
    return (
        <MainContainer>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/game' component={Game} />  
                    <Route path='/selectmenu' component={SelectMenu} />                  
                </Switch>
            </BrowserRouter>
        </MainContainer>
    );
}