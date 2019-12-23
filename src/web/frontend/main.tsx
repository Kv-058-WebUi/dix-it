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
import io from "socket.io-client"

import {Provider} from 'react-redux'
import store from './redux/store/store'

const App = () => {
    const socket = io('http://localhost:5000');
    return (
        <Provider store={store}>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path="/game">
                            <GamePage socket={socket}/>
                        </Route>
                        <Route path="/lobby">
                            <Lobby/>
                        </Route>
                        <Route path="/">
                            <MainPage/>
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
