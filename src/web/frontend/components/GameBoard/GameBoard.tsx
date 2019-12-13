import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import Dixit from '../../model/Dixit';
// import './gameboard.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// todo: find better solution
import '../../images/cards/card_1.png';
import '../../images/cards/card_2.png';
import '../../images/cards/card_3.png';
import '../../images/cards/card_4.png';
import '../../images/cards/card_5.png';
import '../../images/cards/card_6.png';
import '../../images/cards/card_7.png';
import '../../images/cards/card_8.png';
import '../../images/cards/card_9.png';
import '../../images/cards/card_10.png';
import '../../images/cards/card_11.png';
import '../../images/cards/card_12.png';

type GameBoardState = {
    users: Users[],
    pushedCards: Card[],
    showMenu: boolean
};

export interface Users {
    id: number;
    name: string;
    cards: object[];
}

interface Card {
    id: number;
    imgURL: string;
}

export default class GameBoard extends Component <{}, GameBoardState> {
    static defaultProps = {
        users: [
            {
                id: 1,
                name: 'Johnny Depp',
                cards: []
            },
            {
                id: 2,
                name: 'Brad Pitt',
                cards: []
            },
            {
                id: 3,
                name: 'Elon Musk',
                cards: []
            },
            {
                id: 3,
                name: 'Elon Musk',
                cards: []
            },
            {
                id: 3,
                name: 'Elon Musk',
                cards: []
            },
            {
                id: 3,
                name: 'Elon Musk',
                cards: []
            },
            {
                id: 3,
                name: 'Elon Musk',
                cards: []
            }
        ]
    };

    constructor(props) { //change any
        super(props);
        const game = new Dixit(props.users);
        const playersWithCards = game.serveCards();
        this.state = {
            users: playersWithCards,
            pushedCards: [],
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

    pushCard = (card: Card) => {
        const { pushedCards } = this.state;
        pushedCards.push(card);
        this.setState({ pushedCards });
    };

    render() {
        const { pushedCards } = this.state;
        return (
            <div>
                <Link to='/'>
                    <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                </Link>
                <PushedCards users={this.state.users} pushedCards={pushedCards} />
                <Hand cards={this.state.users[0].cards} pushCard={this.pushCard} />
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