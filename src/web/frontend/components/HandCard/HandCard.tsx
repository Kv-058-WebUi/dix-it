import React, { Component } from 'react';
import Submit from '../Submit/Submit';
import './handcard.scss';


export default class HandCard extends Component {

    render() {
        return (
            <div className='handcard-container'>
                <div className='hand-card'>
                    <img src={`images/${this.props.imageUrl}`}/>
                </div>
            </div>
        );
    }
}