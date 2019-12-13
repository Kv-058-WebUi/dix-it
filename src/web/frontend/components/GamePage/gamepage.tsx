import GameBoard from "../GameBoard/GameBoard";
import * as React from "react";
import {Link} from "react-router-dom";
import GameSettings from "./gamesettings";
import GameSidePanel from "./gameSidePanel";

//todo: add chat
export default function GamePage() {
    return (
        <div className={'game-root'}>
            <header>
                <Link to='/'>
                    <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                </Link>
            </header>
            <GameBoard/>
            <GameSidePanel/>
            <footer>
                <GameSettings/>
            </footer>
        </div>
    )
}