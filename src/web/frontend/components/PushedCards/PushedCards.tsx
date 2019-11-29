import React, { Component } from 'react';
import Card from '../Card/Card';
import './pushedcards.scss';

type PushedCardsProps = {
    users: string[]
}

export default class PushedCards extends Component <PushedCardsProps> {
    static defaultProps = {
        users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user5', 'user5']
    };
    render() {
    const classNames = require('classnames');
    const {users} = this.props;
    const containerClass = classNames({
        'field-box': true,
        'five-cards': users.length === 5
    });
    return (
        <div className={containerClass}>
            {users.map((item:string, index:number) => {
                return <Card key={index} />;
            })}
        </div>
    );
}

    // render() {
    //     const { users } = this.props;
    //     const containerClass = users.length === 5 ? 'field-box five-cards' : 'field-box';
    //     return (
    //         <div className={containerClass}>
    //             {users.map((item:string, index:number) => {
    //                 return <Card key={index} />;
    //             })}
    //         </div>
    //     );
    // }
}

