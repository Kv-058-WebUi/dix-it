import React, { Component } from 'react';
import './UpBar.scss';
import LinearDeterminate from './TimerBar/TimerBar'
import {WordBar, wordParams} from './WordBar/WordBar';

interface wordState {
    insertedword: wordParams;
  }

export default class UpBar extends React.Component<any, wordState>  {

    public state: wordState = {
        insertedword : {word:'Dreaming'},
      }


    render() {
        return (
            <div className="Wordclass">
            <WordBar word={this.state.insertedword.word}/>
            <LinearDeterminate />   </div>     
            );
    }
}