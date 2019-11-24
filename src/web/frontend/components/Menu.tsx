import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/components/menu.scss';

export default class Menu extends Component {
    render() {
        return (
            <div className={'menu'}>
                <button className={'button'}>Play</button>
                <ul className={'links'}>
                    <li><Link to="/lobby">Join the game</Link></li>
                    <li><a href='#'>Create room</a></li>
                </ul>
            </div>
        );
    }
};