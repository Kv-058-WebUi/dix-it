import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import Dixit from '../../model/Dixit';
import './gameboard.scss';
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



// todo:
// show pushed cards instead of free slots
// this.state.users -> this.state.users.length in PushedCards ?

type GameBoardState = {
    users: object[],
    pushedCards: object[]
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
            pushedCards: []
        }
    }

    pushCard = (card) => {
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
            </div>
        );
    }
}
