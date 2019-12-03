import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import './hand.scss';


type HandProps = {
    cards: object[]
}

export default class Hand extends Component <HandProps> {
    render() {
        return (
            <div className='field-hand'>
                {this.props.cards.map((card:object, index:number) => {
                    return (
                        <HandCard imageUrl={card.imgURL} key={index} />
                    );
                })}
            </div>
        );
    }
}