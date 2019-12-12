import React from "react"
import {Row, roomParams} from './Row'
import Preloader from "./Preloader";
import axios from 'axios';

interface tableState {
    list: roomParams[];
    instantList: roomParams[];
    done: boolean
}

export default class Table extends React.Component<any, tableState> {

    public state: tableState = {
        list: [
            // {
            //     room_id: 1,
            //     creator_id: 'Peter',
            //     name: 'Awesome Room',
            //     is_private: false,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 2,
            //     creator_id: 'Adam',
            //     name: 'Pretty Room',
            //     is_private: false,
            //     playersCur: 1,
            //     max_players: 7
            // },
            // {
            //     room_id: 3,
            //     creator_id: 'Henry',
            //     name: 'Funny Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 4,
            //     creator_id: 'Chris',
            //     name: 'Scary Room',
            //     is_private: false,
            //     playersCur: 4,
            //     max_players: 7
            // },
            // {
            //     room_id: 5,
            //     creator_id: 'Patrik',
            //     name: 'Wonderful Room',
            //     is_private: true,
            //     playersCur: 5,
            //     max_players: 7
            // },
            // {
            //     room_id: 6,
            //     creator_id: 'John',
            //     name: 'Secret Room',
            //     is_private: false,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 7,
            //     creator_id: 'Bob',
            //     name: 'Big Room',
            //     is_private: false,
            //     playersCur: 6,
            //     max_players: 7
            // },
            // {
            //     room_id: 8,
            //     creator_id: 'Smith',
            //     name: 'Small Room',
            //     is_private: true,
            //     playersCur: 1,
            //     max_players: 7
            // },
            // {
            //     room_id: 9,
            //     creator_id: 'Even',
            //     name: 'Awesome Room',
            //     is_private: false,
            //     playersCur: 2,
            //     max_players: 7
            // },
            // {
            //     room_id: 10,
            //     creator_id: 'asd',
            //     name: 'Awesome Room',
            //     is_private: false,
            //     playersCur: 4,
            //     max_players: 7
            // },
            // {
            //     room_id: 11,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 12,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 13,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 14,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 15,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // },
            // {
            //     room_id: 16,
            //     creator_id: 'Peteasdr',
            //     name: 'Awesome Room',
            //     is_private: true,
            //     playersCur: 3,
            //     max_players: 7
            // }
        ],
        instantList: [],
        done: false
    };

    componentWillMount = () => {
        this.setState({instantList: this.state.list})
    };

    componentDidMount() {

        let self = this;

        axios.get(`/api/rooms`)
            .then(
                function (res) {
                    self.setState({
                        list: res.data,
                        instantList: res.data,
                        done: true
                    });
                    console.log(res.data);
                }
            );
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

    sortByPlaces(key: any, key2: any) {
        let arrayCopy = [...this.state.list];
        arrayCopy.sort((a: any, b: any) => {
            if (a[key] - a[key2] < b[key] - b[key2]) return -1;
            if (a[key] - a[key2] > b[key] - b[key2]) return 1;
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

                {
                    !this.state.done ? (
                        <Preloader/>
                    ) : (
                        <div>
                            <div className={'lobby__table-row head'}>
                                <div className={'lobby__table-cell creator'}>
                                    <p className={'lobby__table-text'}
                                       onClick={() => this.sortBy('creator_id')}>Creator</p>
                                </div>
                                <div className={'lobby__table-cell room-name'}>
                                    <p className={'lobby__table-text'} onClick={() => this.sortBy('name')}>Room name</p>
                                </div>
                                <div className={'lobby__table-cell access'}>
                                    <p className={'lobby__table-text'} onClick={() => this.sortBy('is_private')}>
                                        public
                                    </p>
                                </div>
                                <div className={'lobby__table-cell players'}>
                                    <p className={'lobby__table-text'}
                                       onClick={() => this.sortByPlaces('playersCur', 'max_players')}>Players</p>
                                </div>
                                <div className={'lobby__table-cell btn'}/>
                            </div>
                            <div className={'lobby__table'}>
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
                    )}


            </div>
        )
    }

};
