import React from "react"

export interface roomArr {
    id: any;
    creator: string;
    name: string;
    locked: boolean;
    playersCur: number,
    playersMax: number
}

export class Row extends React.Component<roomArr> {

    constructor(props: roomArr) {
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
                    <button className={'lobby__table-btn'} type={'button'}>Join ></button>
                </div>
            </div>
        )
    }

};
