import React, { Component, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import Rules from '../Rules/Rules';
// import ModalWindow from "./ModalWindow";
import './header.scss';
import AuthWindow from '../AuthWindow/AuthWindow';
import UserProvider from '../UserProvider/UserProvider';

type HeaderProps = {
    onlineCount: number
};
type HeaderState = {
    showRules: boolean,
    showAuthForm: boolean
};

export default class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            showRules: false,
            showAuthForm: false
        };
    }

    static defaultProps = {
        onlineCount: 333
    };

    handleHelpClick = () => this.setState({ showRules: true });
    handleAuthFormClick = () => this.setState({ showAuthForm: true });

    handleFormClick = (e: any) => {
        if (!e.target.closest('.ModalWindow')) {
            this.setState({ showAuthForm: false });
        }
    };

    handleRulesClick = (e: any) => {
        if (!e.target.closest('.ModalWindow')) {
            this.setState({ showRules: false });
        }
    };

    handleLogOut = () => {
        localStorage.removeItem('jwt_token');
        location.href = '/';
    }

    render() {
        return (
            <nav className='header'>
                <Link to='/'><img className='logo' src={require('./LOGO.png')} alt='logo' /></Link>
                <p className='online'>Online: {this.props.onlineCount}</p>
                <div className='nav'>
                    <UserProvider.context.Consumer>{context => (
                        <React.Fragment>
                            {context.user && context.user.authenticated
                                ? (<React.Fragment>
                                    <a href='#'>{context.user.nickname}</a>
                                    <a href='#' onClick={this.handleLogOut}>Log out</a>
                                </React.Fragment>)
                                : (<a href='#' onClick={this.handleAuthFormClick}>Sign In</a>)}
                        </React.Fragment>
                    )}</UserProvider.context.Consumer>
                    <a href='mailto:name@email.com'>Contact Us</a>
                    <a href='#' onClick={this.handleHelpClick}><img className='help' src={require('./help.png')} alt='rules' /></a>
                </div>
                {this.state.showRules ? (
                    <div onClick={this.handleRulesClick}>
                        <Rules />
                    </div>
                ) : ''}
                {this.state.showAuthForm ? (
                    <div onClick={this.handleFormClick}>
                        <AuthWindow />
                    </div>
                ) : ''}
            </nav>
        );
    }
};
