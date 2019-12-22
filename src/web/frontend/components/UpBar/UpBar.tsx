import React from 'react';
import './UpBar.scss';
import LinearDeterminate from './TimerBar/TimerBar'
import {WordBar, wordParams} from './WordBar/WordBar';

interface word {
    word: string;
  }


export default class UpBar extends React.Component<any, word>  {

    constructor(props: word) {
        super(props)
    }

    render() {
        return (
            <div className="Wordclass">
                <WordBar word={this.props.word}/>
                <LinearDeterminate />
            </div>
            );
    }
}