import React, {useState} from "react";
import ReactDOM from "react-dom";
import Header from './components/header'
import Footer from './components/footer'

import "./sass/main.scss";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home'
import Lobby from './components/Lobby/lobby'

const App = () => {

    return (
        <div className="App">

            <Router>

                <Header/>

                <Switch>
                    <Route path="/lobby" component={Lobby}/>
                    <Route exact path="/" component={Home}/>
                </Switch>

                <Footer/>

            </Router>


        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
