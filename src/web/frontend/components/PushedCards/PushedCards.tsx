import React, { Component } from 'react';
import classNames from 'classnames';
import Card from '../Card/Card';
import * as GB from '../GameBoard/GameBoard';
import {Users} from '../GameBoard/GameBoard';
import {CardType} from '../GameBoard/GameBoard';
import './pushedcards.scss';

interface PushedCardsProps {
    users: Users[]
    pushedCards: GB.CardType[]
}

export default class PushedCards extends Component <PushedCardsProps> {
    render() {
        const { users } = this.props;
        const containerClass = classNames({
            'field-box': true,
            'five-cards': users.length === 5
        });

        return (
            <div className={containerClass}>
                {users.map((item:Users, index:number) => {
                    const pushed = this.props.pushedCards[index];
                    if (pushed) {
                        return <Card key={index} item={`../../images/cards/${pushed.card_path}`}/>;
                    }
                    return <Card key={index} />;
                })}
            </div>
        );
    }
}