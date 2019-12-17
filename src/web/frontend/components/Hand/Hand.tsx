import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import {Card} from '../GameBoard/GameBoard';
import './hand.scss';


type HandProps = {
    cards: Card[], 
    pushCard: Card
}
export default class Hand extends Component <HandProps> {
    render() {
        const { pushCard, cards } = this.props;

        return (
            <div className='field-hand'>
                {cards.map((card:Card, index:number) => {
                    return (
                        <HandCard
                            key={index}
                            card={card}
                            pushCard={pushCard}
                        />
                    );
                })}
            </div>
        );
    }
}