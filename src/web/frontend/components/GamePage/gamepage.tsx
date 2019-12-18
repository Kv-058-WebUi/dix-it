import GameBoard from "../GameBoard/GameBoard";
import React, { useState, useEffect } from "react";
import {Link, Redirect} from "react-router-dom";
import GameSettings from "./gamesettings";
import GameSidePanel from "./gameSidePanel";
<<<<<<< HEAD
import { GameOverForm } from "../GameOverForm/GameOverForm";
=======
import {useEffect} from "react";
>>>>>>> 1dff5e8... removed comments

export interface SocketProps {
    socket: SocketIOClient.Socket;
}
export interface player {
    img: string,
    name: string,
    score: number
}

export default function GamePage(props: SocketProps) {
    let sortedplayers: player[] = []
    const players: player[] = [
        { img: 'https://data.whicdn.com/images/326190807/original.jpg', name: 'Travis Scott', score: 28 },
        { img: 'https://cdn190.picsart.com/230274111006202.jpg?c256x256', name: 'Dominic Toretto', score: 30 },
        { img: 'https://i.pinimg.com/originals/7c/8d/16/7c8d16ddcc93c6f73d447acdee97ec19.jpg', name: 'Ricardo Milos', score: 16 },
        { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdnuMzWi_RWHDygOIe1G4P7y35NSBXMLplf9s76z5ICasgZZvk&s', name: 'Donald Trump', score: 10 },
        { img: 'https://data.whicdn.com/images/307386368/original.png', name: 'Felix Kjelberg', score: 50 },
        { img: 'https://pbs.twimg.com/profile_images/1095610317831315456/JfGZvhEe_400x400.jpg', name: 'Marzia Spaghetti', score: 8 },
    ]
    const compareBy = (key: any) => {
        return function (a: any, b: any) {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        };
    }
    
    const sortBy = (key: any) => {
        let arrayCopy = [...players];
        arrayCopy.sort(compareBy(key));
        return arrayCopy;
    }

<<<<<<< HEAD
    const [isModalShown, setModalShown]:any = useState(false);
    sortedplayers = sortBy('score');    
    const [playerlist] = useState(sortedplayers)
    const winnerList = [...playerlist]
=======
>>>>>>> 1dff5e8... removed comments
    useEffect(() => {
        props.socket.emit('game page open')
    });

    return (
        <div className={'game-root'}>
            <header>
                <Link to='/'>
                    <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                </Link>
                {isModalShown ? (
                    <GameOverForm players = {winnerList}/>
            ): <button onClick={() => setModalShown(true)}>Win the game</button>}  
            </header>
            {console.log('sortedplayers', sortedplayers)}
            <GameBoard/>
            <GameSidePanel players = {playerlist} socket={ props.socket }/>
            <footer>
                <GameSettings/>
            </footer>
        </div>
    )
}