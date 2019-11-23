import React, {Component} from 'react';
import '../styles/components/header.scss';


export default class Header extends Component {
    render() {
        return (
            <nav className='header'>
                <a href='/'><img className='logo' src={require('../images/LOGO.png')} alt='logo'/></a>
                <p className='online'>Online: 300</p>
                <div className='nav'>
                    <a href='/signin'>Sign In</a>
                    <a href='/contactus'>Contact Us</a>
                    <a href='/rules'><img className='help' src={require('../images/help.png')} alt='rules'/></a>
                </div>
            </nav>
        );
    }
}
