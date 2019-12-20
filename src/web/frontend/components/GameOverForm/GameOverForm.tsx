import React, {useState, useEffect, useRef} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import './GameOverForm.scss'
import { Fireworks } from './Fireworks/Fireworks';
import Winner from './Winner/Winner';
import { Redirect } from 'react-router-dom';
import {player} from '../GamePage/gamepage';

interface GameOverFormInterface {
    players: player[];
}

export const GameOverForm = (props: GameOverFormInterface) => {
    const gameOverHeight = 'auto';
    const gameOverWidth = '600px'; 
    const [isRedirect, setRedirect] = useState(false) ;
    const redirect = () => {
        setRedirect(!isRedirect);
    };
    const renderRedirect = () => {
        if(isRedirect) {
            console.log('redirect');
            return <Redirect to='/lobby'/>
        }
    };
    useEffect(() => {
       document.addEventListener('click', redirect);
    });
    const winner = props.players.shift();
    
    return (
        <div>
            {renderRedirect()}
            <ModalWindow modalWindowType='gameover'
            windowHeight={gameOverHeight}
            windowWidth={gameOverWidth}>
            <Winner winner = {winner} players = {props.players}/>
            </ModalWindow>
            <Fireworks/>
        </div>
    )
}
