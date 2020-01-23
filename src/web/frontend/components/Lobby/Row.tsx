import React from "react"
import { Link } from "react-router-dom";

export interface roomParams {
    room_id: any;
    creator_id: {player_id:number, nickname: string};
    name: string;
    room_code: string;
    is_private: boolean;
    playersCur: number,
    max_players: number
}

export class Row extends React.Component<roomParams> {

    constructor(props: roomParams) {
        super(props);
    }

    render() {
        return (
            <div className={'lobby__table-row'}>
                <div className={'lobby__table-cell creator'}>
                    <p className={'lobby__table-text'}>{this.props.creator_id.nickname}</p>
                </div>
                <div className={'lobby__table-cell room-name'}>
                    <p className={'lobby__table-text'}>{this.props.name}</p>
                </div>
                <div className={'lobby__table-cell access'}>
                    <p className={'lobby__table-text'}>
                        {(this.props.is_private ? 'Locked' : '')}
                    </p>
                </div>
                <div className={'lobby__table-cell players'}>
                    <p className={'lobby__table-text'}>{this.props.playersCur} / {this.props.max_players}</p>
                </div>
                <div className={'lobby__table-cell btn'}>
                    <Link className={'lobby__table-btn'} to={`/game/${this.props.room_code}`}>Join ></Link>
                </div>
            </div>
        )
    }

};
