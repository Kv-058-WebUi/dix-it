import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';
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

    toggleCreateRoomPopup = (e: any) => {
        if (!e.target.closest('.ModalWindow') && !e.target.closest('.MuiPopover-root')) {
            this.setState({ showCreateRoomPopup: false });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className='menu'>
                    <button className='button'><Link to='/game'>Play</Link></button>
                    <ul className='links'>
                        <li><Link to='/lobby'>Join the game</Link></li>
                        <li><a href='#' onClick={this.handleCreateRoomClick}>Create room</a></li>
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