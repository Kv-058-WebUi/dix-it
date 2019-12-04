import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './gameboard.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

interface gameBoardState {
    showMenu: boolean;
}

export default class GameBoard extends Component<any, gameBoardState> {

    constructor(props:any) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    };

    showMenu() {
        const visible = this.state.showMenu;
        if(visible) {
            return (
                <ul className={'game-settings__list'}>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <HelpOutlineIcon style={{ fill: '#fff' }}/>
                        </button>
                    </li>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <ExitToAppIcon style={{ fill: '#fff' }}/>
                        </button>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <div>
                <Link to='/'>
                    <img className='game-logo' src={require('../../images/logo.png')} alt='logo'/>
                </Link>
                <div className={'game-settings'}>
                    <button className={'game-settings__btn'} onClick={() => this.toggleMenu()} type={'button'}>
                        <SettingsIcon style={{ fill: '#fff' }}/>
                    </button>
                    {this.showMenu()}
                </div>
            </div>
        );
    }

}

