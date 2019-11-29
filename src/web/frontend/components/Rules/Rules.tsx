import React, {Component} from 'react';
import './rules.scss';
import ModalWindow from "../ModalWindow/ModalWindow";

export default class Rules extends Component {

    render() {
        const rulesHeight = '450px';
        const rulesWidth = '800px';
        return (
            <ModalWindow modalWindowType='rules' windowHeight={rulesHeight} windowWidth={rulesWidth}>
                <h1 className='title'>rules</h1>
                <p className='rule'>
                    One player is the storyteller for the turn and looks
                    at the images on the 6 cards in her hand. From one of
                    these, she makes up a sentence and says it out loud
                    (without showing the card to the other players).
                </p>

                <p className='rule'>
                    Each other player selects the card in their hands which
                    best matches the sentence and gives the selected card
                    to the storyteller, without showing it to the others.
                </p>

                <p className='rule'>
                    The storyteller shuffles her card with all the received
                    cards. All pictures are shown face up and every player
                    has to bet upon which picture was the storyteller's.
                </p>

                <p className='rule'>
                    If nobody or everybody finds the correct card, the storyteller
                    scores 0, and each of the other players scores 2. Otherwise the
                    storyteller and whoever found the correct answer score 3. Players
                    score 1 point for every vote for their own card.
                </p>

                <p className='rule'>
                    The game ends when the deck is empty or if a player scores 30 points.
                    In either case, the player with the most points wins the game.
                </p>
            </ModalWindow>
        );
    }
}
