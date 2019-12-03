import React, { Component } from 'react';
import './card.scss';

export default class Card extends Component {
    render() {
        return (
            <div className='card-container'>
                <div className='card'>
                    {/*<img src={`images/${this.props.imageUrl}`}/>*/}
                </div>
            </div>
        );
    }
}