import PlayerList from "../PlayerList/PlayerList";
import Chat from "../Chat/chat";
import * as React from "react";
import './gamepage.scss'

import {GamePageProps, player} from "./gamepage";
import UserProvider from "../UserProvider/UserProvider";
interface GameSideProps extends GamePageProps {
    players: player[];
}       
export default function GameSidePanel(props: GameSideProps) {
    return (
        <UserProvider.context.Consumer>{
            context => (
                <div className={'game-side-panel'}>
                    <PlayerList players={props.players}/>
                    <Chat  user={props.user} socket = {props.socket} userName = {context.user && context.user.nickname ? context.user.nickname : 'Me'}/>
                </div>
            )
        }
        </UserProvider.context.Consumer>
    );
}