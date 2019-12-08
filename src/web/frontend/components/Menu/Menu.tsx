import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';
import './menu.scss';

export default class Menu extends Component<{}, { showModal: boolean }> {
    constructor() {
        super({});
        this.state = { showModal: false }
    }

    render() {
        return (
            <React.Fragment>
                <div className='menu'>
                    <button className='button'><Link to='/game'>Play</Link></button>
                    <ul className='links'>
                        <li><Link to='/lobby'>Join the game</Link></li>
                        <li><a href='#' onClick={() => this.setState({ showModal: true })}>Create room</a></li>
                    </ul>
                </div>
                <CreateRoomPopup
                    onClose={() => this.setState({ showModal: false })}
                    open={this.state.showModal}
                />
            </React.Fragment>
        );
    }
};