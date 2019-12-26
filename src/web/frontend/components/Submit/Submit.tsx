import React, { Component } from 'react';
import {CardType} from '../GameBoard/GameBoard';
import './submit.scss';
import { type } from 'os';

export type PushCardFn = (card:CardType) => void;
type SubmitProps = {
    card: CardType, 
    pushCard: PushCardFn,
};

export default class Submit extends Component <SubmitProps> {

    render() {
        const { pushCard, card } = this.props;
        return (
            <div className='submit-container'>
                <button
                    onClick={() => pushCard(card)}
                    className='submit-button'>
                    Submit
                </button>
            </div>
        );
    }
}
