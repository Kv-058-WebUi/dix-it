import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './mainpage.scss';
import  UserProfile from '../UserProfile/UserProfile'

export default class MainPage extends Component {
    render() {
        return (
            <div className='main-page-container'>
                <img className='unicorn' src={require('./UNICORN.png')} alt='unicorn'/> 
                <Header />
                <Menu />
                <Footer />
                {/* <UserProfile/> */}
            </div>
        );
    }
}