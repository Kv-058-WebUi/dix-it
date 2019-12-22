import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios';
import UpBar from "../UpBar/UpBar"

type GameBoardProps = {
    users: Users[]
};

type GameBoardState = {
    users: Users[],
    pushedCards: Card[],
    showMenu: boolean,
    isCardPushed: boolean
};

export interface Users {
    id: number;
    name: string;
    cards: Card[];
};

export interface Card {
    card_id: number;
    card_path: string;
};

export default class GameBoard extends Component <GameBoardProps, GameBoardState> {
    constructor(props: GameBoardProps) {
        super(props);
        this.state = {
            users: [],
            pushedCards: [],
            showMenu: false,
            isCardPushed: false
        };
    }
    
    componentWillMount() {
        axios.get(`/api/game/serve`).then(res => this.setState({users: res.data}));
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

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
    }

    pushCardFn = (card: Card) => {
        const { pushedCards, isCardPushed } = this.state;
        pushedCards.push(card);
        this.setState({ pushedCards});
        this.setState({ isCardPushed: true });
        console.log('isCardPushed from GB: ', isCardPushed)
    }

    render() {
        const { pushedCards, users } = this.state;
        const playerCards = users[0] && users[0].cards;
        return (
            <React.Fragment>
                    <UpBar/>
                    <PushedCards users={this.state.users} pushedCards={pushedCards} />
                    {users.length ? 
                        <Hand cards={playerCards} pushCard={this.pushCardFn} /> 
                    : ''}
            
                    <div className={'game-settings'}>
                        <button className={'game-settings__btn'} onClick={() => this.toggleMenu()} type={'button'}>
                            <SettingsIcon style={{ fill: '#fff' }}/>
                        </button>
                        {this.showMenu()}
                    </div>
            </React.Fragment>
        );
    }
}