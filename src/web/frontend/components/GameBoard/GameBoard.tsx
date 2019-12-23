import React, { Component } from 'react';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import Dixit from '../../model/Dixit';
import UpBar from "../UpBar/UpBar"

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
import { GameOverForm } from '../GameOverForm/GameOverForm';
import WordInput from "../WordInput/WordInput";



// todo:
// show pushed cards instead of free slots
// this.state.users -> this.state.users.length in PushedCards ?

type GameBoardState = {
    users: object[],
    pushedCards: object[],
    inputIsVisible: boolean,
    word: string
};

export default class GameBoard extends Component <{}, GameBoardState> {
    static defaultProps = {
        users: [
            {
                id: 1,
                name: 'Johnny Depp',
            },
            {
                id: 2,
                name: 'Brad Pitt',
            },
            {
                id: 3,
                name: 'Elon Musk',
            },
            {
                id: 3,
                name: 'Elon Musk',
            },
            {
                id: 3,
                name: 'Elon Musk',
            },
            {
                id: 3,
                name: 'Elon Musk',
            },
            {
                id: 3,
                name: 'Elon Musk',
            }
        ]
    };

    constructor(props: any) {
        super(props);
        const game = new Dixit(props.users);
        const playersWithCards = game.serveCards();
        this.state = {
            users: playersWithCards,
            pushedCards: [],
            inputIsVisible: false,
            word: 'Choose your card'
        }
    }
    handleWord = (wordValue: string) => {
        this.setState({word: wordValue})
    };

    pushCard = (card:any) => {
        const { pushedCards } = this.state;
        pushedCards.push(card);
        this.setState({pushedCards});
            this.setInputVisible(true)
 
    };

    setInputVisible = (status: boolean) => {
        this.setState({inputIsVisible: status})
    };

    render() {
        const { pushedCards } = this.state;
        return (
            <React.Fragment>
                <UpBar word={this.state.word}/>
                <PushedCards users={this.state.users} pushedCards={pushedCards} />
                <Hand cards={this.state.users[0].cards} pushCard={this.pushCard} />
                {
                   this.state.inputIsVisible ? (<WordInput
                       visibility={this.setInputVisible}
                       onWordInput = {this.handleWord}
                   />) : null
                }
            </React.Fragment>
        );
    }
}

