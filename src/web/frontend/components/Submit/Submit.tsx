import React, { Component } from 'react';
import {Card} from '../GameBoard/GameBoard';
import './submit.scss';

type SubmitProps = {
    card: Card[], 
    pushCard: Card,
    hideCard: boolean
}

export default class Submit extends Component <SubmitProps> {

    render() {
        const { pushCard, card, hideCard } = this.props;
        return (
            <div className='submit-container'>
                <button
                    onMouseDown={() => pushCard(card)}
                    onClick={hideCard}
                    className='submit-button'>
                    Submit
                </button>
            </div>
        );
    }
}