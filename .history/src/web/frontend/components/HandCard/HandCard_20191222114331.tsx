import React, { Component } from 'react';
import Submit, { PushCardFn } from '../Submit/Submit';
import classNames from 'classnames';
import {Card} from '../GameBoard/GameBoard';
import './handcard.scss';

type HandCardState = {
    showSubmitButton: boolean,
    showCard: boolean
};

type HandProps = {
    card: Card, 
    pushCard: PushCardFn,
    isCardPushed: boolean
};

export default class HandCard extends Component <HandProps, HandCardState> {
    constructor(props: HandProps) {
        super(props);

        this.state = {
            showSubmitButton: false,
            showCard: true
        };
    }

    handleCardClick = (): void  => this.setState({ showSubmitButton: true });

    handleLeave = (e: any): void  => {
        e.preventDefault();
        if (this.state.showSubmitButton) {
            this.setState({ showSubmitButton: false });
        }
    };

    hideCard = () => this.setState({ showCard: false });

    render() {
        const { pushCard, card, isCardPushed } = this.props;
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
                                 src={`images/cards/${card.card_path}`}
                            />
                        </div>
                        {isCardPushed ? '' :
                             this.state.showSubmitButton ?
                                <Submit pushCard={pushCard} card={card}
                                        hideCard={this.hideCard}/> : ''
                        }
                    </div> : ''}
            </div>
        );
    }
}