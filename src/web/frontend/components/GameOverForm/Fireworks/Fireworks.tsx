import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';
const FireworksCanvas = require('fireworks-canvas');
import { options } from './config';

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
            {/* <audio autoPlay src={require('./win.mp3')}></audio> */}
        </div>
    )
}