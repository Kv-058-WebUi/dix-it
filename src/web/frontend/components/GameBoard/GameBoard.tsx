import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios';
import UpBar from "../UpBar/UpBar";
import { Card } from '@material-ui/core';
import WordInput from '../WordInput/WordInput';

type GameBoardProps = {
    socket: SocketIOClient.Socket
};

type GameBoardState = {
    users: Users[],
    cards: CardType[],
    pushedCards: CardType[],
    showMenu: boolean,
    isCardPushed: boolean,
    isInputVisible: boolean,
    word: string,
    timerState: number
};

export type RestartTimer = () => void;
export type TimerPlusPlus = (diff: number) => void;
export type OnWordInput = (wordValue: string) => void;
export type Visibility = (status: boolean) => void;

export interface Users {
    id: number;
    name: string;
    cards: CardType[];
};

export interface CardType {
    card_id: number;
    card_path: string;
}

export default class GameBoard extends Component <GameBoardProps, GameBoardState> {
    constructor(props: GameBoardProps) {
        super(props);
        this.state = {
            users: [],
            cards: [],
            pushedCards: [],
            isInputVisible: false,
            word: 'Choose your card',
            showMenu: false,
            isCardPushed: false,
            timerState: 0
        };
    }

    componentWillMount() {
        Promise.all([
            axios.get('/api/demo/serve'),
            axios.get('/api/demo/players'),
        ]).then(([
            cardsResp,
            playersResp,
        ]) => this.setState({
            cards: cardsResp.data,
            users: playersResp.data,
        }));
        this.props.socket.on('New Word From StoryTeller', this.handleWord);
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
    handleWord = (wordValue: string) => {
        this.setState({word: wordValue})
    };

    restartTimer = () => {
        this.setState({timerState: 0});
    }

    timerPlusPlus = (diff: number) => {
        let {timerState} = this.state
        this.setState({
            timerState: timerState + diff
        })
    }

    pushCardFn = (card: CardType) => {
        const { pushedCards, isCardPushed } = this.state;
        pushedCards.push(card);
        this.setState({
            pushedCards,
            isCardPushed: true
        });

        const cardMessage: CardType = {
            card_id: card.card_id,
            card_path: card.card_path
        };

        this.props.socket.emit('send pushed card', cardMessage);
        console.log('pushed card emitted');
        this.setInputVisible(true);
    }

    componentDidMount = ()  => {
        this.props.socket.on('new card', this.handleNewCard);
    }

    handleNewCard = (newCard: CardType) => {
        console.log('recieved card on FE', newCard)
        this.setState({ pushedCards: [...this.state.pushedCards, newCard] });
    }

    setInputVisible = (status: boolean) => {
        this.setState({isInputVisible: status})
    };

    render() {
        const { users, isCardPushed, pushedCards, cards } = this.state;
        return (
            <React.Fragment>
                    <UpBar word={this.state.word}
                       socket = {this.props.socket}
                       timerState = {this.state.timerState}
                       timerPlusPlus = {this.timerPlusPlus}
                       restartTimer = {this.restartTimer}
                    />
                    <PushedCards users={users} pushedCards={pushedCards} />

                    { users.length ?
                        <Hand cards={cards}
                            pushCard={this.pushCardFn}
                            isCardPushed={isCardPushed}/>
                    : '' }

                    { isCardPushed ?
                         pushedCards.map((item:CardType, index:number) => {
                            const cardID = item.card_id;
                            cards.map((item:CardType, index:number) => {
                                if (item.card_id === cardID) {
                                    cards.splice(index, 1)
                                }
                            })
                        })
                    : '' }

                    {
                   this.state.isInputVisible ? (<WordInput
                       visibility={this.setInputVisible}
                       onWordInput = {this.handleWord}
                       socket = {this.props.socket}
                       restartTimer = {this.restartTimer}
                   />) : null
                    }

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
