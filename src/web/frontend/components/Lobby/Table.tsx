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
        list: [],
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
