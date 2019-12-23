import React, { useEffect, useState } from 'react';
import './winner.scss';
import PlayerList from '../../PlayerList/PlayerList';


 
const Winner = (props: any) => {
    return (
        <div className="winnerContainer">
            <img src={props.winner.img} alt="winnerImage" className="winnerLogo"/>
            <div className='winnerContainer'>
                <span className='winnerNickname'>{props.winner.name}</span> 
                <span className='winnerScore'>{props.winner.score + ' points'}</span>
            </div>
            <div className='winnerList'>
                <PlayerList players={props.players} />
            </div>
        </div>
    )
}

export default Winner