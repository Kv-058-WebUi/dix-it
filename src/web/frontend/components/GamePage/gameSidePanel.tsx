import PlayerList from "../PlayerList/PlayerList";
import Chat from "../Chat/chat";
import * as React from "react";
import './gamepage.scss'
import {SocketProps} from "./gamepage";

interface GameSideProps extends SocketProps {
    players: Array<any>
}
export default function GameSidePanel(props: GameSideProps) {
    return (
        <div className={'game-side-panel'}>
            <PlayerList players={props.players}/>
            <Chat socket={ props.socket }/>
        </div>
    );
}