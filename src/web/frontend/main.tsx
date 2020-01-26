import React from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import Lobby from './components/Lobby/Lobby';
import GamePage from "./components/GamePage/gamepage";
import UserProfile from "./components/UserProfile/UserProfile"
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

const App = () => {
    return (
        <Provider store={store}>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path="/game/:room_code">
                            <UserProvider.context.Consumer>{context => (
                                context.user && <GamePage socket={ socket } user={ context.user }/>
                            )}</UserProvider.context.Consumer>
                        </Route>
                        <Route path="/lobby">
                            <Lobby />
                        </Route>
                        <Route path="/profile">
                            <UserProfile />
                        </Route>
                        <Route path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </Router>
            </UserProvider>
        </Provider>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
