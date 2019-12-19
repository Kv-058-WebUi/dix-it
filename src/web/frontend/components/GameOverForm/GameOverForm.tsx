import React, {useState, useEffect, useRef} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import './GameOverForm.scss'
import { Fireworks } from './Fireworks/Fireworks';
import Winner from './Winner/Winner';
import { Redirect } from 'react-router-dom';

export const GameOverForm = (props: any) => {
    const gameOverHeight = 'auto';
    const gameOverWidth = '600px'; 
    const [isRedirect, setRedirect]:any = useState(false) 
    const redirect = () => {
        setRedirect(!isRedirect)
    }
    const renderRedirect = () => {
        if(isRedirect) {
            console.log('redirect');
            return <Redirect to='/lobby'/>
        }
    }
    useEffect(() => {
       document.addEventListener('click', redirect)
    })
    const winner = props.players.shift();
    console.log('winner',winner);
    
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
