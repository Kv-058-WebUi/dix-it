import React, {useState} from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import GameBoard from './components/GameBoard/GameBoard';
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


function Lobby () {
    return <h2>Lobby PAGE</h2>;
}

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
