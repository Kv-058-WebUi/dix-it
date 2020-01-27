import React from 'react'
import './PlayerListElement.scss'
import classNames from 'classnames';

export interface pleParams {
    img: any;
    name: string;
    score: any;
    color: string;
    inGame: boolean;
    player_id: number;
    currentPlayer?: number;
    storyteller_id?: number;
    // colorid: string;
    // index: number
}


export class PlayerListElement extends React.Component<pleParams, pleParams> {

    constructor(props: pleParams) {
        super(props);
    }

    render() {
        const containerClass = classNames({
            'PlayerListElement': true,
            'PlayerListElement_offline': !this.props.inGame,
            ['PlayerListElement_' + this.props.color]: true
        });

        return (
            <div className={containerClass}>
                {this.props.player_id == this.props.storyteller_id ? <div className="storyteller-mark"></div>: ''}
                <img className="PlayerAvatar" src={this.props.img}/>
                <h1 className="PlayerName "/* this.props.color */>{this.props.name}</h1>
                <h1 className="PlayerScore">{this.props.score}</h1>
                {this.props.player_id == this.props.currentPlayer ? <div className="player-mark">you</div>: ''}
            </div>
        )
    }
}
