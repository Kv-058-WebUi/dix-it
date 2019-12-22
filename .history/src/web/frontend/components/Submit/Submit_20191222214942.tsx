import React, { Component } from 'react';
import {Card} from '../GameBoard/GameBoard';
import './submit.scss';
import { type } from 'os';

export type PushCardFn = (card:Card) => void;
type SubmitProps = {
    card: Card, 
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