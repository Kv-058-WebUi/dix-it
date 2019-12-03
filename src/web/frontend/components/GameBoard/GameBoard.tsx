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


const users = [
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
    }
];

type GameBoardState = {
    users: object[]
};

export default class GameBoard extends Component <{}, GameBoardState> {
    constructor(props: any) {
        super(props);
        const game = new Dixit(users);
        const playersWithCards = game.serveCards();
        this.state = {
            users: playersWithCards
        }
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                </Link>
                <PushedCards users={this.state.users}/>
                <Hand cards={this.state.users[0].cards}/>
            </div>
        );
    }
}
