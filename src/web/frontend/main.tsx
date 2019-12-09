import React, {useState} from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import GameBoard from './components/GameBoard/GameBoard';
import Lobby from './components/Lobby/Lobby';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./sass/main.scss";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <GameBoard />
                </Route>
                <Route path="/lobby">
                    <Lobby />
                </Route>
                <Route path="/">
                    <MainPage />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
