import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import {Card} from '../GameBoard/GameBoard';
import './hand.scss';
import { PushCardFn } from '../Submit/Submit';


type HandProps = {
    cards: Card[], 
    pushCard: PushCardFn,
    isCardPushed: boolean
};

export default class Hand extends Component <HandProps> {
    render() {
        const { pushCard, cards, isCardPushed } = this.props;
        console.log('pushCard ', this.props.pushCard);
        return (
            <div className='field-hand'>
                {cards.map((card:Card, index:number) => {
                    return (
                        <HandCard
                            key={index}
                            card={card}
                            pushCard={pushCard}
                            isCardPushed={isCardPushed}
                        />
                    );
                })}
            </div>
        );
    }
}