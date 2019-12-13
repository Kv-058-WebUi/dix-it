import React, {useState} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import './GameOverForm.scss'
import { Fireworks } from './Fireworks/Fireworks';

export const GameOverForm = () => {
    const gameOverHeight = '450px';
    const gameOverWidth = '450px';
    return (
        <div>
            <ModalWindow modalWindowType='gameover' windowHeight={gameOverHeight} windowWidth={gameOverWidth}>
                
            </ModalWindow>
            <Fireworks/>
        </div>
    )
}