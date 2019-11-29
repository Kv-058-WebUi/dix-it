import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './mainpage.scss';

export default class MainPage extends Component {
    render() {
        return (
            <div className='container'>
                <img className='unicorn' src={require('./UNICORN.png')} alt='unicorn'/>
                <Header />
                <Menu />
                <Footer />
            </div>
        );
    }
}