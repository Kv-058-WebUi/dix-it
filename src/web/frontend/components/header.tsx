import React from "react";
import { Link } from "react-router-dom";

import "../sass/components/header.scss";

export default class Header extends React.Component {

    showModal = () =>  {
        alert('Click!!')
    };

    render() {
        return (
                <div className='header'>

                    <div className="left-side">
                        <Link className='header__logo' to='/'>
                            <img src={require("../images/logo.png")} alt=""/>
                        </Link>

                        <p className="header__online-players">Online: 300</p>

                    </div>

                    <ul className={'header__nav-list'}>
                        <li className={'header__nav-item'}>
                            <Link to="/about">Sign In</Link>
                        </li>
                        <li className={'header__nav-item'}>
                            <Link to="/lobby">Lobby</Link>
                        </li>
                        <li className={'header__nav-item'}>
                            <button className={'header__info-btn'} onClick={this.showModal} type={'button'}>?</button>
                        </li>
                    </ul>
                </div>
        )
    }

};
