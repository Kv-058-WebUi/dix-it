import React, { Component } from 'react';
import classNames from 'classnames';
import './card.scss';
import { CardType } from '../GameBoard/GameBoard';
import { CombinedStateInterface } from '../../redux/reducer/combineReducer';
import { connect } from 'react-redux';
import Submit from '../Submit/Submit';
import { voteCard } from '../../redux/actions/voteCard';

type CardProps = {
    card?: CardType,
    pushed?: boolean,
    storytellers?: boolean,
    canVoteCard: boolean,
    submittedCardId?: number,
    voteCard: (card: CardType) => void,
}

type CardState = {
    showSubmitButton: boolean
}

class Card extends Component <CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);

        this.state = {
            showSubmitButton: false,
        };
    }

    handleLeave = (e: any): void  => {
        e.preventDefault();
        if (this.state.showSubmitButton) {
            this.setState({ showSubmitButton: false });
        }
    };

    handleCardClick = (): void  => {
        if(this.props.canVoteCard) {
            this.setState({ showSubmitButton: true });
        }
    }

    render() {
        let imageUrl = this.props.card
            ? `../../images/cards/${this.props.card.card_path}`
            : require('./cardshirt.png');
        
        const cardClass = classNames({
            'card': true,
            'pushed': this.props.pushed,
            'storytellers': this.props.storytellers,
            'active-card': this.props.card,
            'border-blur': this.state.showSubmitButton
        });

        const canVote = this.props.canVoteCard &&
            this.state.showSubmitButton &&
            this.props.card &&
            this.props.card.card_id !== this.props.submittedCardId;

        return (
            <div onMouseLeave={this.handleLeave} className='card-container'>
                <div className={cardClass}>
                    <img onClick={this.handleCardClick} src={imageUrl} />
                </div>

                {
                    canVote && this.props.card ?
                    <Submit pushCard={this.props.voteCard} card={this.props.card} /> : ''
                }
            </div>
        );
    }
}

function mapStateToProps(state: CombinedStateInterface) {
    return {
        canVoteCard: state.gamePageStore.canVoteCard,
        submittedCardId: state.gamePageStore.submittedCardId,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    voteCard: (card: CardType) => dispatch(voteCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card)