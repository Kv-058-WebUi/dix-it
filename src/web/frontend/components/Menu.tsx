import React, {Component} from 'react';
import '../styles/components/menu.scss';


export default class Menu extends Component {
    render() {
        return (
            <div className={'menu'}>
                <button className={'button'}>Play</button>
                <ul className={'links'}>
                    <li><a href='#'>Join the game</a></li>
                    <li><a href='#'>Create room</a></li>
                </ul>
            </div>
        );
    }
}