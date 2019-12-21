import GameBoard from "../GameBoard/GameBoard";
import * as React from "react";
import {Link} from "react-router-dom";
import GameSettings from "./gamesettings";
import GameSidePanel from "./gameSidePanel";
import {useEffect} from "react";

export interface SocketProps {
    socket: SocketIOClient.Socket;
}
export default function GamePage(props: SocketProps) {

    useEffect(() => {
        props.socket.emit('game page open')
    });

    return (
        <div className={'game-root'}>
            <header>
                <Link to='/'>
                    <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                </Link>
            </header>
            <GameBoard/>
            <GameSidePanel socket={ props.socket }/>
            <footer>
                <GameSettings/>
            </footer>
        </div>
    )
}