import React from "react"
import { Link } from "react-router-dom";

export interface roomParams {
    id: any;
    creator: string;
    name: string;
    locked: boolean;
    playersCur: number,
    playersMax: number
}

export class Row extends React.Component<roomParams> {

    constructor(props: roomParams) {
        super(props);
    }

    render() {
        return (
            <div className={'lobby__table-row'}>
                <div className={'lobby__table-cell creator'}>
                    <p className={'lobby__table-text'}>{this.props.creator}</p>
                </div>
                <div className={'lobby__table-cell room-name'}>
                    <p className={'lobby__table-text'}>{this.props.name}</p>
                </div>
                <div className={'lobby__table-cell access'}>
                    <p className={'lobby__table-text'}>
                        {(this.props.locked ? 'Locked' : '')}
                    </p>
                </div>
                <div className={'lobby__table-cell players'}>
                    <p className={'lobby__table-text'}>{this.props.playersCur} / {this.props.playersMax}</p>
                </div>
                <div className={'lobby__table-cell btn'}>
                    <Link className={'lobby__table-btn'} to='/game'>Join ></Link>
                </div>
            </div>
        )
    }

};
