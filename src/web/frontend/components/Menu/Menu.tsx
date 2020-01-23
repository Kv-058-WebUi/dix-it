import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';
import UserProvider from '../UserProvider/UserProvider';
import axios from 'axios';
import './menu.scss';

type MenuState = {
    showCreateRoomPopup: boolean
};

export default class Menu extends Component<any, MenuState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showCreateRoomPopup: false
        };
    }

    handleCreateRoomClick = () => this.setState({ showCreateRoomPopup: true });

    handlePlayClick = () => {
        axios.get('/api/rooms/random')
            .then(res => {
                const payload = res.data; 
                
                if(payload.error) {
                    alert(payload.error);
                } else {
                    const url = '/game/' + payload.room_code;console.log(payload.room_code)
                    location.href = url;
                }
            })
            .catch(error => {
                console.log(error)
                alert('Something went wrong :(');
            });
    };

    toggleCreateRoomPopup = (e: any) => {
        if (e.target.click && !e.target.closest('.ModalWindow') && !e.target.closest('.MuiPopover-root')) {
            this.setState({ showCreateRoomPopup: false });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className='menu'>
                    <button className='button' onClick={this.handlePlayClick}>Play</button>
                    <ul className='links'>
                        <li><Link to='/lobby'>Join the game</Link></li>
                        <UserProvider.context.Consumer>
                            {context => (
                                <li className={!context.user || !context.user.authenticated ? 'no' : ''}><a href='#' onClick={this.handleCreateRoomClick}>Create room</a></li>
                            )}
                        </UserProvider.context.Consumer>
                    </ul>
                </div>
                { this.state.showCreateRoomPopup ? (
                    <div onClick={this.toggleCreateRoomPopup}>
                        <CreateRoomPopup />
                    </div>
                ) : '' }
            </React.Fragment>
        );
    }
};