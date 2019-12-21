import React, { Component } from 'react';
import './PlayerList.scss'
import { PlayerListElement, pleParams } from './PlayerListElement/PlayerListElement';

interface playerlistState {
  players: pleParams[];
  sortedplayers: pleParams[];
}

export default class PlayerList extends React.Component<any, playerlistState> {

  constructor(props: playerlistState) {
    super(props)
  }

  render() {
    return (
      <div className='PlayerPanel'>
        {this.props.players.map((sortedplayer:any, index: any) => {
          return (
            <PlayerListElement
              key={index}
              img={sortedplayer.img}
              name={sortedplayer.name}
              score={sortedplayer.score}
            />
          )
        })}
      </div>
    );
  }
};


