import * as React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './routes/Home/Home';
import Game from './routes/Game/Game';

const MainContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export default function Router() {
    return (
        <MainContainer>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/game' component={Game} />
                </Switch>
            </BrowserRouter>
        </MainContainer>
    );
}