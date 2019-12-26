import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import {CardType} from '../GameBoard/GameBoard';
import './hand.scss';
import { PushCardFn } from '../Submit/Submit';


type HandProps = {
    cards: CardType[], 
    pushCard: PushCardFn,
    isCardPushed: boolean
};

export default class Hand extends Component <HandProps> {
    render() {
        const { pushCard, cards, isCardPushed } = this.props;
        return (
            <div className='field-hand'>
                {cards.map((card:CardType, index:number) => {
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