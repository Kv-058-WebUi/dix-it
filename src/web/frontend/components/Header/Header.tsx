import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rules from '../Rules/Rules';
// import ModalWindow from "./ModalWindow";
import './header.scss';
import RegistrationForm from "../RegistrationForm/RegistrationForm";

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

    render() {
        return (
            <nav className='header'>
                <Link to='/'><img className='logo' src={require('./LOGO.png')} alt='logo'/></Link>
                <p className='online'>Online: {this.props.onlineCount}</p>
                <div className='nav'>
                    <a href='#' onClick={this.handleAuthFormClick}>Sign In</a>
                    <a href='mailto:name@email.com'>Contact Us</a>
                    <a href='#' onClick={this.handleHelpClick}><img className='help' src={require('./help.png')} alt='rules'/></a>
                </div>
                { this.state.showRules ? (
                    <div onClick={this.handleRulesClick}>
                        <Rules />
                    </div>
                ) : '' }
                { this.state.showAuthForm ? (
                    <div onClick={this.handleFormClick}>
                        <RegistrationForm />
                    </div>
                ) : '' }
            </nav>
        );
    }
};
