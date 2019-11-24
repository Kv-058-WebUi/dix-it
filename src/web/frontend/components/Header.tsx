import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rules from "./Rules";
import '../styles/components/header.scss';

type HeaderProps = {
    onlineCount: Number
};
type HeaderState = {
    showRules: Boolean
};

export default class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            showRules: false
        };
    }

    static defaultProps = {
        onlineCount: 0
    };

    handleHeaderClick = (e: any) => {
        const clickedOnRulesChild = e.target.closest('.rules');
        if (e.target.className === 'help' || clickedOnRulesChild) {
            this.setState({ showRules: true });
        } else {
            this.setState({ showRules: false });
        }
    };

    render() {
        return (
            <nav className='header' onClick={this.handleHeaderClick}>
                <Link to='/'><img className='logo' src={require('../images/LOGO.png')} alt='logo'/></Link>
                <p className='online'>Online: {this.props.onlineCount}</p>
                <div className='nav'>
                    <a href='/signin'>Sign In</a>
                    <a href='mailto:name@email.com'>Contact Us</a>
                    <a href='#'><img className='help' src={require('../images/help.png')} alt='rules'/></a>
                </div>
                { this.state.showRules ? <Rules /> : '' }
            </nav>
        );
    }
};
