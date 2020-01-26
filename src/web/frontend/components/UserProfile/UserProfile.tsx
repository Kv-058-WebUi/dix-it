import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './UserProfile.scss';
import UserProfileWindow from './UserProfileWindow/UserProfileWindow'

export default class UserProfile extends Component {
    render() {
        return (
            <div className='userprofile'>
                <Header />
                <UserProfileWindow/>
                
            </div>
        );
    }
}