import PlayerList from "../PlayerList/PlayerList";
import Chat from "../Chat/chat";
import * as React from "react";
import './gamepage.scss'
import {SocketProps} from "./gamepage";

export default function GameSidePanel(props: SocketProps) {
    return (
        <div className={'game-side-panel'}>
            <PlayerList/>
            <Chat socket={ props.socket }/>
        </div>
    );
}