import React from "react"
import {Row, roomParams} from './Row'

interface tableState {
    list: roomParams[];
    instantList: roomParams[];
}

export default class Table extends React.Component<any, tableState> {

    public state: tableState = {
        list: [
            {
                id: 1,
                creator: 'Peter',
                name: 'Awesome Room',
                locked: false,
                playersCur: 3,
                playersMax: 7
            },
            {
                id: 2,
                creator: 'Adam',
                name: 'Pretty Room',
                locked: false,
                playersCur: 1,
                playersMax: 7
            },
            {
                id: 3,
                creator: 'Henry',
                name: 'Funny Room',
                locked: true,
                playersCur: 3,
                playersMax: 7
            },
            {
                id: 4,
                creator: 'Chris',
                name: 'Scary Room',
                locked: false,
                playersCur: 4,
                playersMax: 7
            },
            {
                id: 5,
                creator: 'Patrik',
                name: 'Wonderful Room',
                locked: true,
                playersCur: 5,
                playersMax: 7
            },
            {
                id: 6,
                creator: 'John',
                name: 'Secret Room',
                locked: false,
                playersCur: 3,
                playersMax: 7
            },
            {
                id: 7,
                creator: 'Bob',
                name: 'Big Room',
                locked: false,
                playersCur: 6,
                playersMax: 7
            },
            {
                id: 8,
                creator: 'Smith',
                name: 'Small Room',
                locked: true,
                playersCur: 1,
                playersMax: 7
            },
            {
                id: 9,
                creator: 'Even',
                name: 'Awesome Room',
                locked: false,
                playersCur: 2,
                playersMax: 7
            },
            {
                id: 10,
                creator: 'asd',
                name: 'Awesome Room',
                locked: false,
                playersCur: 4,
                playersMax: 7
            },
            {
                id: 11,
                creator: 'Peteasdr',
                name: 'Awesome Room',
                locked: true,
                playersCur: 3,
                playersMax: 7
            }
        ],
        instantList: []
    };

    componentWillMount = () => {
        this.setState({instantList: this.state.list})
    };

    compareBy(key: any) {
        return function (a: any, b: any) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key: any) {
        let arrayCopy = [...this.state.list];
        arrayCopy.sort(this.compareBy(key));
        this.setState({list: arrayCopy});
    }

    sortByPlaces(key:any, key2:any) {
        let arrayCopy = [...this.state.list];
        arrayCopy.sort((a:any, b:any) => {
            if(a[key] - a[key2] < b[key] - b[key2]) return -1;
            if(a[key] - a[key2] > b[key] - b[key2]) return 1;
            return 0;
        });
        this.setState({list: arrayCopy});
    }

    filterRooms = (event: any) => {
        let updatedList = this.state.instantList;
        updatedList = updatedList.filter(function (room) {
            return room.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({list: updatedList});
    };

    render() {
        return (
            <div className={'lobby__table-wrapper'}>
                <div className={'lobby__table'}>
                    <div className={'lobby__table-row head'}>
                        <div className={'lobby__table-cell creator'}>
                            <p className={'lobby__table-text'} onClick={() => this.sortBy('creator')}>Creator</p>
                        </div>
                        <div className={'lobby__table-cell room-name'}>
                            <p className={'lobby__table-text'} onClick={() => this.sortBy('name')}>Room name</p>
                        </div>
                        <div className={'lobby__table-cell access'}>
                            <p className={'lobby__table-text'} onClick={() => this.sortBy('locked')}>
                                public
                            </p>
                        </div>
                        <div className={'lobby__table-cell players'}>
                            <p className={'lobby__table-text'} onClick={() => this.sortByPlaces('playersCur', 'playersMax')}>Players</p>
                        </div>
                        <div className={'lobby__table-cell btn'}/>
                    </div>
                    {
                        this.state.list.map((room: roomParams, i: number) => {
                                return (
                                    <Row {...room} key={i}/>
                                )
                            }
                        )
                    }
                </div>
                <div className={'lobby__filter'}>
                    <div className={'lobby__filter-text'}>
                        <input className={'lobby__filter-input'} onChange={this.filterRooms} type="text"
                               placeholder={'Search...'}/>
                    </div>
                </div>
            </div>
        )
    }

};
