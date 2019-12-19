import PlayerList from "../PlayerList/PlayerList";
import Chat from "../Chat/chat";
import * as React from "react";
import './gamepage.scss'

export default function GameSidePanel(props: any) {
    return (
        <div className={'game-side-panel'}>
            <PlayerList players={props.players}/>
            <Chat/>
        </div>
    );
}