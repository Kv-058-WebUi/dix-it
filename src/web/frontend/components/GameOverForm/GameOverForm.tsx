import React, {useState, useEffect, useRef} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import './GameOverForm.scss'
import { Fireworks } from './Fireworks/Fireworks';
import Winner from './Winner/Winner';
// import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import {hideWinner} from "../../redux/actions/hideWinnerModal";

const GameOverForm = (props:any) => {
    const gameOverHeight = 'auto';
    const gameOverWidth = '600px';
    const [isRedirect, setRedirect] = useState(false) ;
    const redirect = () => {
        setRedirect(!isRedirect);
    };
    const renderRedirect = () => {
        if(isRedirect) {
            console.log('redirect');
            props.hideWinner();
            // return <Redirect to='/lobby'/>
            setTimeout(() => {
                window.location.href = '/lobby'
            }, 500)
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
};

const mapDispatchToProps = (dispatch:any) => ({
    hideWinner: () => dispatch(hideWinner())
});

export default connect(null, mapDispatchToProps)(GameOverForm);
