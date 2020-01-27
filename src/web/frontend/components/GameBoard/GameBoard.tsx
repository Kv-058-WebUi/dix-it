import React, { Component } from 'react';
import PushedCards from '../PushedCards/PushedCards';
import Hand from '../Hand/Hand';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import UpBar from "../UpBar/UpBar";
import WordInput from '../WordInput/WordInput';
import { submitWord } from '../../redux/actions/submitWord';
import { submitCard } from '../../redux/actions/submitCard';
import { startGame } from '../../redux/actions/startGame';
import { connect } from 'react-redux';
import { CombinedStateInterface } from '../../redux/reducer/combineReducer';
import CallToAction from '../GamePage/CallToAction';

type GameBoardProps = {
    socket: SocketIOClient.Socket,
    canStartGame: boolean,
    canSubmitWord: boolean,
    submitWord: (word: string) => void,
    submitCard: (card: CardType) => void,
    startGame: () => void,
};

type GameBoardState = {
    showMenu: boolean,
    isCardPushed: boolean,
    isInputVisible: boolean,
};

export type RestartTimer = () => void;
export type TimerPlusPlus = (diff: number) => void;
export type OnWordInput = (wordValue: string) => void;
export type Visibility = (status: boolean) => void;

export interface Users {
    id: number;
    name: string;
    cards: CardType[];
};

export interface CardType {
    card_id: number;
    card_path: string;
}

class GameBoard extends Component <GameBoardProps, GameBoardState> {
    constructor(props: GameBoardProps) {
        super(props);
        this.state = {
            isInputVisible: false,
            showMenu: false,
            isCardPushed: false,
        };
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    showMenu() {
        const visible = this.state.showMenu;
        if (visible) {
            return (
                <ul className={'game-settings__list'}>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <HelpOutlineIcon style={{ fill: '#fff' }}/>
                        </button>
                    </li>
                    <li className={'game-settings__item'}>
                        <button className={'game-settings__btn'} type={'button'}>
                            <ExitToAppIcon style={{ fill: '#fff' }}/>
                        </button>
                    </li>
                </ul>
            );
        }
    }
    handleWord = (wordValue: string) => {
        this.props.submitWord(wordValue);
    };

    handleStartGame = () => {
        this.props.startGame();
    };

    pushCardFn = (card: CardType) => {
        this.props.submitCard(card);
        console.log(card, 'in component')
    }

    setInputVisible = (status: boolean) => {
        this.setState({isInputVisible: status})
    };

    render() {
        return (
            <React.Fragment>
                <UpBar />
                <PushedCards />
                {
                    this.props.canStartGame ?
                    <div className="start-game-button-wrapper">
                        <button className='start-game-button' onClick={this.handleStartGame}>Start Game</button>
                    </div> :
                    <React.Fragment>
                        <Hand pushCard={this.pushCardFn}/> 
                        <CallToAction />
                    </React.Fragment>
                }

                    {
                   this.props.canSubmitWord ? (<WordInput
                       onWordInput = {this.handleWord}
                   />) : null
                    }

                    <div className={'game-settings'}>
                        <button className={'game-settings__btn'} onClick={() => this.toggleMenu()} type={'button'}>
                            <SettingsIcon style={{ fill: '#fff' }}/>
                        </button>
                        {this.showMenu()}
                    </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: CombinedStateInterface) {
    return {
        canStartGame: state.gamePageStore.canStartGame,
        canSubmitWord: state.gamePageStore.canSubmitWord,
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    startGame: () => dispatch(startGame()),
    submitWord: (word: string) => dispatch(submitWord(word)),
    submitCard: (card: CardType) => dispatch(submitCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
