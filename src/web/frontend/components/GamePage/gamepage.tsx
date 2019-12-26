import GameBoard from "../GameBoard/GameBoard";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import GameSettings from "./gamesettings";
import GameSidePanel from "./gameSidePanel";
import GameOverForm from "../GameOverForm/GameOverForm";
import { UserData } from "../UserProvider/UserProvider";
import {connect} from "react-redux";
import {gamePageStore} from "../../redux/actions/setStore";
import {showWinner} from "../../redux/actions/showWinnerModal";


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

    render() {
        return (
            <div className={'game-root'}>
                <header>
                    <Link to='/'>
                        <img className='game-logo' src={require('../Header/LOGO.png')} alt='logo'/>
                    </Link>
                    {this.props.isModalShown ? (
                        <GameOverForm players={this.state.sortedList}/>
                    ) : <button onClick={this.props.showWinner}>Win the game</button>}
                </header>
                <GameBoard socket={ this.props.socket }/>
                <GameSidePanel players={this.state.sortedList} socket={this.props.socket} user={this.props.user}/>
                <footer>
                    <GameSettings/>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        players: state.gamePageStore.gamePage.gamePlayers,
        isModalShown: state.gamePageStore.gamePage.isModalShown,
        setModalShown: state.gamePageStore.gamePage.setModalShown
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    gamePageStore: () => dispatch(gamePageStore()),
    showWinner: () => dispatch(showWinner())
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
