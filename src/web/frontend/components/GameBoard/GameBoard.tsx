import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PushedCards from "../PushedCards/PushedCards";
import './gameboard.scss';
import PlayerList from "../PlayerList/PlayerList";
import UpBar from "../UpBar/UpBar"

export default class GameBoard extends Component {
    render() {
        return (
            <div>
                <Link to='/'><img className='game-logo' src={require('./LOGO.png')} alt='logo'/></Link>
                <div className='field-box'>
                    <UpBar/>
                    <PlayerList/>
                </div>
            </div>
        );
    }
}