import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rules from "./Rules";
import '../styles/components/header.scss';

type HeaderProps = {
    onlineCount: Number
};
type HeaderState = {
    showRules: Boolean,
    showSignin: Boolean
};

export default class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            showRules: false,
            showSignin: false
        };
    }

    static defaultProps = {
        onlineCount: 0
    };

    // event delegation:
    // handleHeaderClick = (e: any) => {
    //     const clickedOnRulesChild = e.target.closest('.rules');
    //     if (e.target.className === 'help' || clickedOnRulesChild) {
    //         this.setState({ showRules: true });
    //     } else {
    //         this.setState({ showRules: false });
    //     }
    //     if (e.target.className === 'signin') {
    //         this.setState({ showSignin: true });
    //     }
    // };

    handleHelpClick = () => this.setState({ showRules: true });

    handleSigninClick = () => this.setState({ showSignin: true });

    handleRulesClick = (e: any) => {
        if (!e.target.closest('.rules')) {
            this.setState({ showRules: false });
        }
    };

    render() {
        return (
            <nav className='header'>
                <Link to='/'><img className='logo' src={require('../images/LOGO.png')} alt='logo'/></Link>
                <p className='online'>Online: {this.props.onlineCount}</p>
                <div className='nav'>
                    <a href='#' onClick={this.handleSigninClick}>Sign In</a>
                    <a href='mailto:name@email.com'>Contact Us</a>
                    <a href='#' onClick={this.handleHelpClick}><img className='help' src={require('../images/help.png')} alt='rules'/></a>
                </div>
                { this.state.showRules ? (
                    <div onClick={this.handleRulesClick}>
                        <Rules />
                    </div>
                ) : '' }
                {/*{ this.state.showSignin ? <Component /> : '' }*/}
            </nav>
        );
    }
};
