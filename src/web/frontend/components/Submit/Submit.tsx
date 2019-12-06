import React, { Component } from 'react';
import './submit.scss';

export default class Submit extends Component {

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