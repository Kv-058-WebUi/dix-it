import React from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import Lobby from './components/Lobby/Lobby';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./sass/main.scss";
import GamePage from "./components/GamePage/gamepage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <GamePage />
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
