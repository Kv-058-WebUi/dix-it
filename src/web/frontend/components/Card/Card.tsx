import React, { Component } from 'react';
import classNames from 'classnames';
import './card.scss';

type CardProps = {
    item?: string
}
export default class Card extends Component <CardProps> {
    render() {
        let imageUrl = this.props.item || require('./cardshirt.png');
        
        const cardClass = classNames({
            'card': true,
            'active-card': this.props.item
        });

        return (
            <div className='card-container'>
                <div className={cardClass}>
                    <img src={imageUrl}/>
                </div>
            </div>
        );
    }
}