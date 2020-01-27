import React, { Component } from 'react';
import classNames from 'classnames';
import Card from '../Card/Card';
import * as GB from '../GameBoard/GameBoard';
import './pushedcards.scss';
import { CombinedStateInterface } from '../../redux/reducer/combineReducer';
import { connect } from 'react-redux';
import { Vote, GamePlayer } from '../../redux/reducer/gamePageReducer';
import { ROOM_STATUSES } from '../../../common/helpers';

interface PushedCardsProps {
    pushedCards: GB.CardType[],
    votes: Array<Vote>,
    playersCounter: number,
    maxPlayers: number,
    gameStatus: ROOM_STATUSES,
    submittedCardsCounter: number,
    storyteller?: GamePlayer
}

class PushedCards extends Component <PushedCardsProps> {
    render() {
        const isGameWaiting = this.props.gameStatus == ROOM_STATUSES.WAITING;
        const containerClass = classNames({
            'field-box': true,
            'five-cards': isGameWaiting ? this.props.maxPlayers === 5 : this.props.playersCounter === 5
        });
        const { playersCounter, pushedCards, submittedCardsCounter, votes, storyteller, maxPlayers, gameStatus } = this.props;
        let cards = [];

        if(pushedCards.length > 0) {
            const storytellersCard = votes.find(vote => storyteller && vote.player.player_id == storyteller.player_id);
            cards = pushedCards.map((card, i) => {
                const cardVotes = votes.find(vote => vote.card.card_id == card.card_id && vote.voters.length > 0);
                const voters = cardVotes ? cardVotes.voters : [];
                return (
                    <div className="card-votes-container" key={i}>
                        <div className="votes-container">{
                            <React.Fragment>{
                            storytellersCard && card.card_id == storytellersCard.card.card_id ?
                            <div className="vote-item vote-item_storyteller"></div>: ''}
                            {voters.map((vote, j) => (
                                <div className="vote-item" key={j} style={{
                                    boxShadow: "0px 0px 3px " + vote.color,
                                    backgroundColor: vote.color
                                }}></div>)
                            )}</React.Fragment>
                        }</div>
                        <Card card={card} storytellers={storytellersCard && storytellersCard.card.card_id == card.card_id}/>
                    </div>
                );
            })
        } else {
            if(gameStatus == ROOM_STATUSES.WAITING) {
                for (let i = 0; i < maxPlayers; i++) {
                    cards.push(<Card key={i} />);
                }
            } else {
                for (let i = 0; i < playersCounter; i++) {
                    cards.push(i < submittedCardsCounter ? <Card key={i} pushed={true}/> : <Card key={i} />);
                }
            }
        }

        return (
            <div className={containerClass}>
                {cards}
            </div>
        );
    }
}

const mapStateToProps = (state: CombinedStateInterface) => ({
    votes: state.gamePageStore.votes,
    submittedCardsCounter: state.gamePageStore.submittedCardsCounter,
    pushedCards: state.gamePageStore.roundCards,
    playersCounter: state.gamePageStore.gamePage.gamePlayers.length,
    storyteller: state.gamePageStore.storyteller,
    maxPlayers: state.gamePageStore.maxPlayers,
    gameStatus: state.gamePageStore.gameStatus
});

export default connect(mapStateToProps)(PushedCards)