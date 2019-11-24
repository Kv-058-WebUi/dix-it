import React, {useState} from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage';
import "./styles/main.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


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

// Router
//  - login page (/login or index)
//      - header
//      - main
//          - menu
//              - button
//              - other links
//      - footer
//  - lobby page (/lobby)
//  - gameboard page (/game/:id)

function GameBoard () {
    return <h2>GameBoard PAGE</h2>;
}

function Lobby () {
    return <h2>Lobby PAGE</h2>;
}

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
