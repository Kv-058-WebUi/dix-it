import React, { Component } from 'react';
import './PlayerList.scss'
import {PlayerListElement, pleParams} from './PlayerListElement/PlayerListElement';

interface playerlistState {
  players: pleParams[];
  sortedplayers: pleParams[];
}

export default class PlayerList extends React.Component<any, playerlistState> { 

    public state: playerlistState = {
        players: [
            {img: 'https://data.whicdn.com/images/326190807/original.jpg', name: 'Travis Scott', score: 28},
            {img: 'https://cdn190.picsart.com/230274111006202.jpg?c256x256', name: 'Dominic Toretto', score: 30},
            {img: 'https://i.pinimg.com/originals/7c/8d/16/7c8d16ddcc93c6f73d447acdee97ec19.jpg', name: 'Ricardo Milos', score: 16},
            {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdnuMzWi_RWHDygOIe1G4P7y35NSBXMLplf9s76z5ICasgZZvk&s', name: 'Donald Trump', score: 10},
            {img: 'https://data.whicdn.com/images/307386368/original.png', name: 'Felix Kjelberg', score: 50},
            {img: 'https://pbs.twimg.com/profile_images/1095610317831315456/JfGZvhEe_400x400.jpg', name: 'Marzia Spaghetti', score: 8},
        ],
        sortedplayers: []
      }


      componentWillMount = () => {
        this.setState({sortedplayers: this.sortBy('score')})
     }

      compareBy(key: any) {
        return function (a: any, b: any) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    }

      sortBy(key: any) {
        let arrayCopy = [...this.state.players];
        arrayCopy.sort(this.compareBy(key));
        return arrayCopy;
    }

    render() {
        return (
            <div className='PlayerPanel'>
            { this.state.sortedplayers.map((sortedplayer, index) => {
              
          return (
            <PlayerListElement
              //key={index}
              img={sortedplayer.img}
              name={sortedplayer.name}
              score={sortedplayer.score}
            />
          )
        }) }
            </div>
        );
    }
};


