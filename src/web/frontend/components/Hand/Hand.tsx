import React, { Component } from 'react';
import HandCard from "../HandCard/HandCard";
import {CardType} from '../GameBoard/GameBoard';
import './hand.scss';
import { PushCardFn } from '../Submit/Submit';
import { connect } from 'react-redux';
import { CombinedStateInterface } from '../../redux/reducer/combineReducer';


type HandProps = {
    cards: CardType[], 
    pushCard: PushCardFn,
    canSubmitCard: boolean
};

class Hand extends Component <HandProps> {
    render() {
        const { pushCard, cards, canSubmitCard } = this.props;
        return (
            <div className='field-hand'>
                {cards.map((card:CardType, index:number) => {
                    return (
                        <HandCard
                            key={index}
                            card={card}
                            pushCard={pushCard}
                            canSubmitCard={canSubmitCard}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: CombinedStateInterface) => ({
    cards: state.gamePageStore.handCards,
    canSubmitCard: state.gamePageStore.canSubmitCard
});

export default connect(mapStateToProps)(Hand)