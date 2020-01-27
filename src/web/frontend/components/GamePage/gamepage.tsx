import GameBoard from "../GameBoard/GameBoard";
import React from "react";
import { Link } from "react-router-dom";
import GameSettings from "./gamesettings";
import GameSidePanel from "./gameSidePanel";
import GameOverForm from "../GameOverForm/GameOverForm";
import { UserData } from "../UserProvider/UserProvider";
import {connect} from "react-redux";
import {gamePageStore} from "../../redux/actions/setStore";
import {joinRoom} from "../../redux/actions/joinRoom";
import JoinRoomPopup from "../JoinRoomPopup/JoinRoomPopup";
import { CombinedStateInterface } from "../../redux/reducer/combineReducer";
import { ROOM_STATUSES, JwtPayload, RoomData } from "../../../common/helpers";
import { leaveRoom } from "../../redux/actions/leaveRoom";
import { GamePlayer } from "../../redux/reducer/gamePageReducer";


export interface GamePageProps {
    socket: SocketIOClient.Socket;
    user: UserData | null;
}

export interface player {
    img: string;
    name: string;
    score: number;
}

class GamePage extends React.Component<any> {

    public state: any = {
        sortedList: [],
        isJoinRoomModalShown: true
    };

    compareBy(key: any) {
        return function (a: any, b: any) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        }
    };

    sortBy(key: any) {
        let arrayCopy = [...this.props.players];
        arrayCopy.sort(this.compareBy(key));
        return arrayCopy;
    };

    componentDidMount = () => {
        this.props.socket.emit('game page open', this.props.user);
        this.props.gamePageStore();
        let sortedPlayers = this.sortBy('score');
        this.setState({
            sortedList: sortedPlayers
        })
    };

    onJoinModalUpdate(isClosed: boolean, room: RoomData) {
        this.setState({isJoinRoomModalShown: !isClosed});
        if(isClosed && room) {
            this.props.joinRoom(room, this.props.user);
        }
    }

    render() {
        let sortedList = this.sortBy('score').sort(this.compareBy('inGame'));
        return (
            this.state.isJoinRoomModalShown ? <JoinRoomPopup user={this.props.user} onJoinModalUpdate={this.onJoinModalUpdate.bind(this)}/> : 
            <div className={'game-root'}>
                <header>
                    <Link to='/' onClick={this.props.leaveRoom}>
                        <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                    </Link>
                    {this.props.isModalShown ? (
                        <GameOverForm players={sortedList}/>
                    ) : ''}
                </header>
                <GameBoard socket={ this.props.socket }/>
                <GameSidePanel players={sortedList} socket={this.props.socket} user={this.props.user}/>
                <footer>
                    <GameSettings/>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state: CombinedStateInterface) {
    return {
        players: state.gamePageStore.gamePage.gamePlayers.map(player => ({
            ...player,
            currentPlayer: state.gamePageStore.player_id,
            storyteller_id: state.gamePageStore.storyteller ? state.gamePageStore.storyteller.player_id : undefined
        })),
        isModalShown: state.gamePageStore.gameStatus == ROOM_STATUSES.FINISHED,
        player_id: state.gamePageStore.player_id
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    gamePageStore: () => dispatch(gamePageStore()),
    leaveRoom: () => dispatch(leaveRoom()),
    joinRoom: (room: RoomData, user: JwtPayload) => dispatch(joinRoom(room, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
