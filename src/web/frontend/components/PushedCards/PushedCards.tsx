import React, { Component } from 'react';
import PushedCard from './PushedCard'
import './pushedcards.scss';

export default class PushedCards extends Component {
    render(){
        const users = ['user1', 'user2', 'user3', 'user4', 'user5', 'user4', 'user5'];

        return users.map((item, index) => {
            return < PushedCard key={index} />
        })
    }
}