import React from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import Lobby from './components/Lobby/Lobby';
import GamePage from "./components/GamePage/gamepage";
import UserProvider from './components/UserProvider/UserProvider';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./sass/main.scss";

import {Provider} from 'react-redux'
import store from './redux/store/store'
import socket from "./socket";
import BannedScreen from "./components/BannedScreen/BannedScreen";

const App = () => {
    return (
        <Provider store={store}>
            <UserProvider>
                <UserProvider.context.Consumer>
                            {context => (
                                (context.user && context.user.is_banned) ? <BannedScreen/> : (
                                <Router>
                                    <Switch>
                                        <Route path="/game/:room_code">
                                                {context.user ? <GamePage socket={ socket } user={ context.user }/> : ''}
                                        </Route>
                                        <Route path="/lobby">
                                            <Lobby />
                                        </Route>
                                        <Route path="/">
                                            <MainPage />
                                        </Route>
                                    </Switch>
                                </Router> 
                                )
                            )}
                </UserProvider.context.Consumer>
            </UserProvider>
        </Provider>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
