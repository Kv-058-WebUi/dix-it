import PlayerList from "../PlayerList/PlayerList";
import Chat from "../Chat/chat";
import * as React from "react";
import './gamepage.scss'
import {SocketProps} from "./gamepage";
import UserProvider from "../UserProvider/UserProvider";

export default function GameSidePanel(props: SocketProps) {
    return (
        <UserProvider.context.Consumer>{
            context => (
                <div className={'game-side-panel'}>
                    <PlayerList/>
                    <Chat socket = {props.socket} userName = {context.user && context.user.nickname ? context.user.nickname : 'Me'}/>
                </div>
            )
        }
        </UserProvider.context.Consumer>
    );
}