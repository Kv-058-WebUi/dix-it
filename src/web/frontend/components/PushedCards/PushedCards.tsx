import React, { Component } from 'react';
import classNames from 'classnames';
import Card from '../Card/Card';
import './pushedcards.scss';

type PushedCardsProps = {
    users: object[]
}

export default class PushedCards extends Component <PushedCardsProps> {
    render() {
        const {users} = this.props;
        const containerClass = classNames({
            'field-box': true,
            'five-cards': users.length === 5
        });
        return (
            <div className={containerClass}>
                {users.map((item:object, index:number) => {
                    return <Card key={index} />;
                })}
            </div>
        );
    }
}

