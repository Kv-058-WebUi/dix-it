import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import './hand.scss';


type HandProps = {
    cards: object[],
    pushCard: void
}

export default class Hand extends Component <HandProps> {
    render() {
        const { pushCard, cards } = this.props;

        return (
            <div className='field-hand'>
                {cards.map((card:object, index:number) => {
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