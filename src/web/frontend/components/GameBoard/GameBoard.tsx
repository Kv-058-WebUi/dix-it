import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
// import Dixit from '../../model/Dixit';
// import './gameboard.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios';


// todo: find better solution
// import '../../images/cards/card_1.png';
// import '../../images/cards/card_2.png';
// import '../../images/cards/card_3.png';
// import '../../images/cards/card_4.png';
// import '../../images/cards/card_5.png';
// import '../../images/cards/card_6.png';
// import '../../images/cards/card_7.png';
// import '../../images/cards/card_8.png';
// import '../../images/cards/card_9.png';
// import '../../images/cards/card_10.png';
// import '../../images/cards/card_11.png';
// import '../../images/cards/card_12.png';

type GameBoardProps = {
    users: Users[]
}

type GameBoardState = {
    users: Users[],
    pushedCards: Card[],
    showMenu: boolean
}

export interface Users {
    id: number;
    name: string;
    cards: Card[];
}

export interface Card {
    id: number;
    imgURL: string;
}

export default class GameBoard extends Component <GameBoardProps, GameBoardState> {
    // get players from db

    constructor(props: GameBoardProps) {
        super(props);
        this.state = {
            users: [],
            pushedCards: [],
            showMenu: false
        }
    }
    
    componentWillMount() {
        let self = this;
        axios.get(`/api/game/serve`)
            .then(
                function (res) {
                    self.setState({
                        users: res.data,
                    });
                }
            );
    };

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    };

    showMenu() {
        const visible = this.state.showMenu;
        if (visible) {
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

    pushCard = (card: Card) => {
        const { pushedCards } = this.state;
        pushedCards.push(card);
        this.setState({ pushedCards });
    };

    render() {
        const { pushedCards, users } = this.state;
        const playerCards = users[0] && users[0].cards;
        return (
            <div>
                <PushedCards users={this.state.users} pushedCards={pushedCards} />
                 {users.length ? 
                    <Hand cards={playerCards} pushCard={this.pushCard} /> 
                : ''}
        
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