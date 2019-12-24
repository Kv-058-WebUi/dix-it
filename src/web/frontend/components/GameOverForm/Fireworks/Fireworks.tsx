import React, { useEffect } from 'react';
const FireworksCanvas = require('fireworks-canvas');
import { options } from './config';
import './fireworks.scss'

export const Fireworks = () => {
    const fireworksHeight = '500px';
    useEffect(() => {
        const container = document.getElementById('container')
        const fireworks = new FireworksCanvas(container, options)
        fireworks.start()
    })
    return (
        <div>
            <div id={'container'} style={{ height: fireworksHeight }}></div>
            <audio autoPlay src={require('./win.mp3')}></audio>
        </div>
    )
}