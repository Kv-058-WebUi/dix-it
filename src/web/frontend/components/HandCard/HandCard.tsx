import React, { Component } from 'react';
import Submit from '../Submit/Submit';
import classNames from 'classnames';
import './handcard.scss';

type HandCardState = {
    showSubmitButton: boolean,
    showCard: boolean
};

export default class HandCard extends Component <any, HandCardState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showSubmitButton: false,
            showCard: true
        };
    }

    handleCardClick = () => this.setState({ showSubmitButton: true });

    handleLeave = (e: any) => {
        e.preventDefault();
        if (this.state.showSubmitButton) {
            this.setState({ showSubmitButton: false });
        }
    };

    hideCard = () => this.setState({ showCard: false });

    render() {
        const { pushCard, card = {} } = this.props;

        const blurClass = classNames({
            'border-blur': this.state.showSubmitButton
        });

        return (
            <div>
                {this.state.showCard ?
                    <div onMouseLeave={this.handleLeave} className='handcard-container'>
                        <div className='hand-card'>
                            <img className={blurClass}
                                 onClick={this.handleCardClick}
                                 src={`images/${card.imgURL}`}
                            />
                        </div>
                        {this.state.showSubmitButton ?
                            <Submit pushCard={pushCard} card={card}
                                    hideCard={this.hideCard}/> : ''}
                    </div> : ''}
            </div>
        );
    }
}